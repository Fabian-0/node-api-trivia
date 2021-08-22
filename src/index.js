require("dotenv").config();
const app = require("./api/server");
const cors = require("cors");
const { json } = require("express");
const router = require("./api/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");


app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(json());
app.use("/api/v1/", router);