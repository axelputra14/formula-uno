const express = require("express");
const router = express.Router();
const circuitController = require("../controllers/circuitController");

router.get("/", circuitController.fetchCircuits);
router.get("/:circuitId", circuitController.fetchCircuitsDetail);
// ini cuma sample
///verify/" + id + "/" + uniqueString
module.exports = router;
