const express = require("express");

const router = express.Router();

const storeControllers = require("../controllers/stores");

router
  .route("/")
  .get(storeControllers.getStores)
  .post(storeControllers.addStore);

module.exports = router;
