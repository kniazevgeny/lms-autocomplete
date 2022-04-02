import * as express from "express";
import * as compression from "compression"; // compresses requests
import * as bodyParser from "body-parser";
import xlsx from "node-xlsx";
// Or var xlsx = require('node-xlsx').default;

/**
 * Create Express server
 */
const app = express();

/**
 * Express configuration.
 */
app.set("port", 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// console.log(page)
app.get('/inlineSearch', (req, res) => {
  console.log(req.query.text)
  let i = page.search(req.query.text);
  res.send(
    page.slice(
      i + req.query.text.length,
      i + req.query.text.length + page.slice(i + req.query.text.length, -1).search(" ")
    )
  );
})

app.listen(3000, () => {
  console.log(("  App is running at http://localhost:%d"), 3000);
  console.log("  Press CTRL-C to stop\n");
});

// module.exports = app;
