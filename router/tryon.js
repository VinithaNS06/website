const express = require("express");

const tryonlistRouter = new express.Router();
const authenticate = require("../middleware/auth");
const TryonList = require("../model/tryon");

/////////////////// CREATE Slider DATA ////////////////////////////

tryonlistRouter.post("/add", async (req, res) => {
  const { title, content, video, buttonname } = req.body;
  //   console.log(req.body)
  try {
    const optiondata = new TryonList({
      title,
      content,
      video,
      buttonname,
    });
    await optiondata.save();
    res.status(200).send({
      status: "true",
      message: "About Loading Success",
      data: optiondata,
    });
  } catch (error) {
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

//////////////////////  UPDATE Slider DATA /////////////////////

tryonlistRouter.put("/:id", async (req, res) => {
  TryonList.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
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
tryonlistRouter.delete("/:id", async (req, res) => {
  TryonList.findByIdAndUpdate(req.params.id, { status: 0 }, (err, Slider) => {
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
  });
});

/////////////////////// GET Slider DATA //////////////////////

tryonlistRouter.get("/get_tryon", async (req, res) => {
  try {
    const results = await TryonList.find({});
    const count = await TryonList.countDocuments();
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

tryonlistRouter.get("/:id", async (req, res) => {
  TryonList.find({ _id: req.params.id }, (err, docs) => {
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

module.exports = tryonlistRouter;
