const express = require("express");

const router = new express.Router();
const authenticate = require("../middleware/auth");
const ContactUSList = require("../model/contactus");

/////////////////// CREATE Slider DATA ////////////////////////////

router.post("/add", async (req, res) => {
  const { name, email, mobilenum, message } = req.body;
  //   console.log(req.body)
  try {
    const optiondata = new ContactUSList({
      name,
      email,
      mobilenum,
      message,
    });
    await optiondata.save();
    res.status(200).send({
      status: "true",
      message: "Request Send Successfully",
      data: optiondata,
    });
  } catch (error) {
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

//////////////////////  UPDATE Slider DATA /////////////////////

router.put("/:id", async (req, res) => {
  ContactUSList.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "About Updated Success",
      data: banner,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete("/:id", async (req, res) => {
  ContactUSList.findByIdAndUpdate(
    req.params.id,
    { status: 0 },
    (err, Slider) => {
      if (err) {
        return res
          .status(200)
          .send({ status: "false", message: "Error", errors: err });
      }
      res.status(200).send({
        status: "true",
        message: "About Deleted Success",
        data: banner,
      });
    }
  );
});

/////////////////////// GET Slider DATA //////////////////////

router.get("/get_contactus", async (req, res) => {
  try {
    const results = await ContactUSList.find({});
    const count = await ContactUSList.countDocuments();
    const bannerdata1 = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "About Loading Success",
      data: bannerdata1,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

router.get("/:id", async (req, res) => {
  ContactUSList.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "About Loading Success",
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
