//const express = require("express");
const router = require("express").Router();
const userRouter = require("./userRouter");
const circuitRouter = require("./circuitRouter");

const authentication = require("../middlewares/authentication");

// ROUTES
router.use("/user", userRouter);

router.use(authentication);
router.use("/circuit", circuitRouter);

// authentication customer nanti

module.exports = router;
