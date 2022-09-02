import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import apiRoutes from "./src/routes/api";
import errorHandler from "./src/middleware/errorHandler";

dotenv.config();
require("./src/config/sequelize");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", apiRoutes);
app.use(errorHandler);

module.exports = app;
