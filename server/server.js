const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
require("dotenv/config");

require("./config/mongoose.config");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

const AllUserRoutes = require("./routes/user.routes");
const AllProductRoutes = require("./routes/product.routes");
AllProductRoutes(app);

AllUserRoutes(app);

// set up multer for storing uploaded files
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log("multer running: ", file);
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
