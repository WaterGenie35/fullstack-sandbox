import compression from "compression";
import Debug from "debug";
import express from "express";
import helmet from "helmet";

const app = express();
const port = 3000;
const debug = Debug("fullstack-sandbox");

// Security practices
// https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());
app.disable("x-powered-by");

// Performance and reliability practices
// Remove compression middleware when we have it at the reverse proxy level
app.use(compression());

app.get("/", (request, response) => {
  response.send("Hello World!");
});

// Deviate from express' default error responses (part of security practice)
app.use((request, response, next) => {
  response.status(404).send("Error: Not found");
});

app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send("Error: Something went wrong");
});

app.listen(port, () => {
  debug("Test debug");
  console.log(`Example app listening on port ${port}!`);
});
