import { SERVER_URL } from "../config/env.js";
import { workFlowClient } from "../config/upstash.js";
import Subscription from "../model/subscription.model.js";
import { sendEmail } from "../utils/send-email.js";

export const createSubscription = async (req, res, next) => {
  // console.log("req  body", req.body, "req user", req.user);
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    await workFlowClient.trigger({
      url: `${SERVER_URL}`,
    });
    await sendEmail({
      to: req.user.email,
      subject: "Subscription Successful ✅",
      html: `<p>Hello ${req.user.name},</p><p>Your subscription has been activated.</p>`,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (err) {
    next(err);
  }
};

export const getSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("you are not the owner of this account");
      error.status = 401;
      throw error;
    }
    const subscription = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscription });
  } catch (err) {
    next(err);
  }
};

export const getAllSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.find();

    res.status(200).json({ success: true, data: subscription });
  } catch (err) {
    next(err);
  }
};
export const deleteSubscription = async (req, res, next) => {
  try {
    const deletedSubscription = await Subscription.findById(req.params.id);

    if (!deletedSubscription) {
      const error = new Error("Subcription not found");
      error.status = 404;
      throw error;
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "subscription deleted successfully" });
  } catch (err) {
    next(err);
  }
};
