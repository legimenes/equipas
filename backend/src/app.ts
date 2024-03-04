import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const playerEndpoints = require("@infra/endpoints/PlayerEndpoints");

app.use('/players', playerEndpoints);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
