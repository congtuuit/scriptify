import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import documents_v1 from "./api/v1/documents";
import swaggerSpec from "./swaggerConfig";
const path = require("path");

const app: Application = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/documents", documents_v1);
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  //res.send('Server running...');
});
app.use("/default", express.static(path.join(__dirname, "public", "default")));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(
    `API documentation available at http://localhost:${port}/api-docs`
  );
});
