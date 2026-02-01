const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("vieu engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); //pubilc is a folder where all static folder located like images, video, pdf, etc

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index.ejs", { files: files });
  });
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show.ejs", {
        filename: req.params.filename,
        filedata: filedata,
      });
    },
  );
});

app.get("/edit/:filename", function (req, res) {
  res.render("edit.ejs", {
    filename: req.params.filename,
  });
});
app.post("/edit", function (req, res) {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}.txt`,
    function (err) {
      res.redirect("/");
    },
  );
});

app.get("/delete/:filename", function (req, res) {
  fs.unlink(`./files/${req.params.filename}`, function (err) {
    res.redirect("/");
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.description,
    function (err) {
      res.redirect("/");
    },
  );
});

app.listen(3000, () => {
  console.log("server runn");
});
