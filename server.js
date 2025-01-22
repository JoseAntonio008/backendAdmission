const express = require("express");
const uploadRouter = require("./services/uploadRoute");
const app = express();
const port = 4000;

app.use(express.json());
app.use("/api", uploadRouter);
app.listen(port, () => {
  console.log(`running on PORT: ${port}`);
});
