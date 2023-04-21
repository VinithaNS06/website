const express = require("express");
const router = new express.Router();

const authenticate = require("../middleware/auth");
const EnquiryList = require("../model/enquiry");

router.post("/", async (req, res) => {
  const enqcategory = req.params._id;
  const { name, email, mobilenum } = req.body;

  try {
    const Checkuser = await EnquiryList.findOne({
      name,
      email,
      mobilenum,
      enqcategory,
    });
    if (Checkuser) {
      return res
        .status(200)
        .json({ status: false, message: "Category Already Exists" });
    }
    const category = new EnquiryList({
      name,
      email,
      mobilenum,
      enqcategory,
    });
    await category.save();
    res
      .status(200)
      .send({ status: "true", message: "EnqCategory Saved", data: category });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put("/:id", async (req, res) => {
  EnquiryList.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "EnqCategory Updated Success",
      data: user,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete("/:id", async (req, res) => {
  EnquiryList.findByIdAndUpdate(req.params.id, { status: 0 }, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "EnqCategory Deleted Success",
      data: user,
    });
  });
});

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/getcategory", async (req, res) => {
  try {
    // execute query with page and limit values
    const results = await EnquiryList.find({ status: 1 });

    // get total documents in the Posts collection
    const count = await EnquiryList.countDocuments();
    const datalist = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "EnqCategory List Loading Success",
      data: datalist,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id", async (req, res) => {
  EnquiryList.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "EnqCategory List Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});

module.exports = router;
