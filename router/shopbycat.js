const express = require("express");
const router = new express.Router();

const authenticate = require("../middleware/auth");
const ShopCatList = require("../model/shopbycat");

router.post("/create", async (req, res) => {
  const { name, image } = req.body;

  try {
    const Checkuser = await ShopCatList.findOne({ name, image });
    if (Checkuser) {
      return res
        .status(200)
        .json({ status: false, message: "ShopBy Category Already Exists" });
    }
    category = new ShopCatList({
      name,
      image,
    });
    await category.save();
    res.status(200).send({
      status: "true",
      message: "ShopBy Category Saved",
      data: category,
    });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put("/:id", async (req, res) => {
  ShopCatList.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "ShopBy Category Updated Success",
      data: user,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete("/:id", async (req, res) => {
  ShopCatList.findByIdAndUpdate(req.params.id, { status: 0 }, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "ShopBy Category Deleted Success",
      data: user,
    });
  });
});

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/", async (req, res) => {
  try {
    // execute query with page and limit values
    const results = await ShopCatList.find({}).exec();
    // get total documents in the Posts collection
    const count = await ShopCatList.countDocuments();
    const datalist = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "ShopBy Category List Loading Success",
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
  ShopCatList.find({ category_id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "ShopBy Category List Loading Success",
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
  ShopCatList.find({ _id: req.params.id }, (err, results) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "ShopBy Category List Loading Success",
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
