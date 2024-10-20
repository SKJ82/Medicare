const express = require("express");
const router = express.Router();
const User = require("../models/user");
const sendMail = require("../sendMail.js");
const auth = require("../middleware/auth");

router.get("/requirements", auth, async (req, res) => {
  try {
    const unit = req.query.unit;
    const sellersList1 = [];
    const sellersList = await User.find({ category: "seller" });
    for (var i in sellersList) {
      var objectUser = sellersList[i].toObject();
      delete objectUser.password;
      if (sellersList[i].ventilator_cnt >= unit) {
        sellersList1.push(objectUser);
      }
    }
    req.user.ventilator_cnt = unit;
    await req.user.save();

    if (sellersList1.length == 0){
      return res.send(
        "Currently No seller is available. We will get back to you as soon as we get your requirement.Please keep checking mails for updates"
      );
    }
    
    sendMail.Notification_of_buyers(
      sellersList1,
      req.user.email,
      req.body[updat]
    );

    res.send(sellersList1);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/update", auth, async (req, res) => {
  const update = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "email",
    "password",
    "phone_no",
    "city"
  ];
  const isvalidUpdate = update.every((updat) => allowedUpdates.includes(updat));
  if (!isvalidUpdate) {
    return res.status(400).send("Invalid Updates");
  }
  try {
    update.forEach(async (updat) => {
      req.user[updat] = req.body[updat]; 
    });
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/delete", auth, async (req, res) => {
  try{
    const buyer = req.user

    await User.findByIdAndDelete(buyer._id)

    res.status(200).send(buyer)
  } catch(e){
    res.status(400).send(e);
  }
});

module.exports = router;
