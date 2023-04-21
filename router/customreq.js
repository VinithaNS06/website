const express = require("express");
const router = new express.Router();

const authenticate = require("../middleware/auth");
const CustomReqList = require("../model/customreq");

router.post("/create", async (req, res) => {
  const { name, email, mobilenum, message, category_id, image } = req.body;

  try {
    const Checkuser = await CustomReqList.findOne({ name, category_id });
    if (Checkuser) {
      return res
        .status(200)
        .json({ status: false, message: "CustomRequest  Already Exists" });
    }
    category = new CustomReqList({
      name,
      email,
      mobilenum,
      message,
      category_id,
      image,
    });
    await category.save();
    res
      .status(200)
      .send({ status: "true", message: "CustomRequest Saved", data: category });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put("/:id", async (req, res) => {
  CustomReqList.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "CustomRequest Updated Success",
      data: user,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete("/:id", async (req, res) => {
  CustomReqList.findByIdAndUpdate(req.params.id, { status: 0 }, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "CustomRequest Deleted Success",
      data: user,
    });
  });
});

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/", async (req, res) => {
  try {
    // execute query with page and limit values
    const results = await CustomReqList.find({}).exec();
    // get total documents in the Posts collection
    const count = await CustomReqList.countDocuments();
    const datalist = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "CustomRequest List Loading Success",
      data: datalist,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY Category ID  ////////////////////////////////// ///*/
router.get("/:id", authenticate, async (req, res) => {
  CustomReqList.find({ category_id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "CustomRequest List Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});
////////////////////////////////// GET CATEGORY BY ID ///////////////////////////////////
router.get("/subcat/:id", authenticate, async (req, res) => {
  CustomReqList.find({ _id: req.params.id }, (err, results) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "CustomRequest List Loading Success",
        data: results,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});
module.exports = router;
