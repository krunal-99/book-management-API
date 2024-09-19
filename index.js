const express = require("express");
const app = express();
const PORT = 6000;
const { users } = require("./data/users.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is ready and running.",
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    message: users,
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }

  return res.status(200).json({
    success: true,
    message: user,
  });
});

app.post("/users", (req, res) => {
  const {
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
    issuedBook,
    issuedDate,
    returnDate,
  } = req.body;
  const user = users.find((each) => each.id == id);

  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exists.",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
    issuedBook,
    issuedDate,
    returnDate,
  });

  return res.status(201).json({
    success: true,
    message: users,
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id == id);
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "User doesn't exists." });

  const updatedUser = users.map((each) => {
    if (each.id == id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    message: updatedUser,
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
