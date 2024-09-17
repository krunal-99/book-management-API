const express = require("express");
const app = express();
const PORT = 6000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is ready and running.",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exists.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
