const express = require("express");
const bodyParser = require("body-parser");
const localtunnel = require("localtunnel");
const app = express();
const cors = require("cors");
import xlsx from "node-xlsx";
import { consoleTestResultHandler } from "tslint/lib/test";

const isDebug = false;

// Add headers before the routes are defined
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

// Parse a file
const workSheetsFromFile = xlsx.parse(`economics.xlsx`);
// Take data from the first worksheet
const page = workSheetsFromFile[0].data as String[][];
// console.log(page)


app.get("/", (req, res) => {
  if (isDebug) console.log(Object.keys(req.query).includes('q'))
  if (Object.keys(req.query).includes('q')){
    try {
      if (isDebug) console.log(req.query.q)
      page.forEach((pair) => {
        if (pair[0].includes(req.query.q)) {
          if (isDebug) {
            console.log(pair[1])
          }
          res.send(`<h5 style='font-family: monospace'>${pair[1]}</h5>`);
          return;
        }
      })
      res.send(`<h5 style='font-family: monospace'>404: not found :/</h5>`);
    }
    catch (err) {
      res.send(`<h5 style='font-family: monospace'>500: internal error :/</h5>`);
    }
  }
  else {
    res.send("<h3 style='font-family: monospace'>🏁🏁🏁Use kniazevgeny.loca.lt/?q={Your question here}🏁🏁🏁</h3>");
  }
});


if (!isDebug) {
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
}

app.listen(3000);
