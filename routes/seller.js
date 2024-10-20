const express = require("express");
const router = express.Router();
const User = require("../models/user");
const sendMail = require("../sendMail.js");
const auth = require("../middleware/auth");

router.get("/", auth, async(req, res) => {
    try{
    const sellersList1 = [];
    const sellersList = await User.find({ category: "seller" });

    if(sellersList.length == 0){
        return res.send("No sellers present currently")
    }

    res.status(200).send(sellersList)

    } catch(e) {
        res.status(400).send(e);
    }
});

router.patch("/update", auth, async(req, res) => {
    const update = Object.keys(req.body);
        const allowedUpdates = [
            "name",
            "email",
            "password",
            "ventilator_cnt",
            "phone_no"
        ];
        const isvalidUpdate = update.every((updat) => allowedUpdates.includes(updat));
        if (!isvalidUpdate) {
            return res.status(400).send("Invalid Updates");
        }

    try{  
        update.forEach(async (updat) => {
            req.user[updat] = req.body[updat];
            if (updat == allowedUpdates[3]) {
                const buyersList1 = [];
                const buyersList = await User.find({ category: "buyer" });
                for (var i in buyersList) {
                    buyersList1.push(buyersList[i].email);
                }
                sendMail.Notification_of_sellers(
                    buyersList1,
                    req.user.email,
                    req.body[updat]
                );
            }
        });

        await req.user.save();
        res.status(200).send(req.user);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete("/delete", auth, async(req, res) => {
    try{
        const seller = req.user

        await User.findByIdAndDelete(seller._id)

        res.status(200).send(seller)
    } catch(e){
        res.status(400).send(e);
    }
});

module.exports = router;

