const express = require("express");
const localtunnel = require("localtunnel");
const app = express();
const cors = require("cors");
import xlsx from "node-xlsx";

// Add headers before the routes are defined
app.use(cors({ origin: "*" }));

// Parse a file
const workSheetsFromFile = xlsx.parse(`Unit_11.xlsx`);
// Take data from the first worksheet
const _page = workSheetsFromFile[0].data;

// Create a string from all the elements
let page = "";
_page.forEach((_array) => {
  (_array as string[]).forEach((element) => {
    // or replace \n by ' '
    page += element.split("\n").join(" ") + " ";
  });
});

app.get("/", (req, res) => {
  res.send("<h2>🏁🏁🏁</h2>");
});

// console.log(page)
app.get("/inlineSearch", (req, res) => {
  let i = page.search(req.query.text);
  console.log(
    req.query.text,
    page.slice(
      i + req.query.text.length,
      i +
        req.query.text.length +
        page.slice(i + req.query.text.length, -1).search(" ")
    )
  );
  res.send({
    data: page.slice(
      i + req.query.text.length,
      i +
        req.query.text.length +
        page.slice(i + req.query.text.length, -1).search(" ")
    ),
  });
});

/*
 * Configure localtunnel
 */

var tunnel = localtunnel(
  3000,
  {
    subdomain: "kniazevgeny-1",
  },
  function (err, tunnel) {
    if (err) {
      console.log("error");
    }

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    const url = tunnel.url;
    console.log(url);
  }
);

tunnel.on("close", function () {
  console.log("重启");
  tunnel;
});
app.use((req, res, next) => {
  tunnel;
});

app.listen(3000);
