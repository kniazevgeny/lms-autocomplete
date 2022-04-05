const express = require("express");
const localtunnel = require("localtunnel");
const app = express();
import xlsx from "node-xlsx";

// Parse a file
const workSheetsFromFile = xlsx.parse(`Unit_11.xlsx`);
// Take data from the first worksheet
const _page = workSheetsFromFile[0].data;

// Create a string from all the elements
let page = "";
_page.forEach((_array) => {
  (_array as string[]).forEach((element) => {
    page += element + " ";
  });
});

app.get("/", (req, res) => {
  res.send("<h2>🏁🏁🏁</h2>");
});

// console.log(page)
app.get("/inlineSearch", (req, res) => {
  console.log(req.query.text);
  let i = page.search(req.query.text);
  res.send(
    page.slice(
      i + req.query.text.length,
      i +
        req.query.text.length +
        page.slice(i + req.query.text.length, -1).search(" ")
    )
  );
});

/*
 * Configure localtunnel
 */

var tunnel = localtunnel(
  3000,
  {
    subdomain: "kniazevgeny",
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
