// express
const express = require("express");
const app = express();

// core
const path = require("path");

// dependencies
const compression = require("compression");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// routers
const baseRouter = require("./routers/base.router.js");
const adminRouter = require("./routers/admin.router.js");
const authRouter = require("./routers/auth.router.js");

// utils
const knex = require("../db/db.js");
const { localVariables } = require("./middlewares/auth.js");
const { get404, get500 } = require("./controllers/error.controller.js");

const store = new KnexSessionStore({
  knex,
  tablename: "sessions",
  createtable: true,
  clearInterval: 30 * 60 * 1000, // 30 min
  disableDbCleanup: false,
});

const csurf = require("csurf");
var csrfProtection = csurf({ cookie: false });

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// app.use(morgan("combined"));
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store,
    cookie: { maxAge: 30 * 60 * 1000 }, // 30 min
  })
);

app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "main");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use("/data", express.static("data"));

app.use(csrfProtection);
app.use(localVariables);

app.use(baseRouter);
app.use(adminRouter);
app.use(authRouter);

app.use(get404);
app.use(get500);

module.exports = app;
