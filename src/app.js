import express from "express";
import helmet from "helmet";

const app = express();
const port = 3000;

// Security Practices
// https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());
app.disable("x-powered-by");

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
  console.log(`Example app listening on port ${port}!`);
});
