const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");

router.get("/", verifyToken, (request, response) => {
  response.send(request.user);
});

module.exports = router;
