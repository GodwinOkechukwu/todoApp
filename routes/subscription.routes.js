// import { Router } from "express";
// import authorize from "../middlewares/auth.middleware.js";
// import {
//   createSubscription,
//   deleteSubscription,
//   getAllSubscription,
//   getSubscription,
// } from "../controllers/subscription.controller.js";

// const subscriptionRouter = Router();

// subscriptionRouter.get("/", getAllSubscription);
// subscriptionRouter.get("/:id", authorize, getSubscription);
// subscriptionRouter.post("/", authorize, createSubscription);
// subscriptionRouter.put("/:id", (req, res) => {
//   res.send({ title: "UPDATE a subs" });
// });
// subscriptionRouter.delete("/:id", deleteSubscription);
// subscriptionRouter.get("/user/:id", authorize, getSubscription);
// subscriptionRouter.put("/:id/cancel", (req, res) => {
//   res.send({ title: "CANCEL sub" });
// });
// subscriptionRouter.get("/upcoming-renewals", (req, res) => {
//   res.send({ title: "GET renewals" });
// });

// export default subscriptionRouter;

import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscription,
  getSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management APIs
 */

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: List of all subscriptions
 */
subscriptionRouter.get("/", getAllSubscription);

/**
 * @swagger
 * /subscriptions/{id}:
 *   get:
 *     summary: Get a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription data
 *       404:
 *         description: Subscription not found
 */
subscriptionRouter.get("/:id", authorize, getSubscription);

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *                 example: "premium-123"
 *     responses:
 *       201:
 *         description: Subscription created successfully
 */
subscriptionRouter.post("/", authorize, createSubscription);

/**
 * @swagger
 * /subscriptions/{id}:
 *   put:
 *     summary: Update a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription updated
 */
subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE a subs" });
});

/**
 * @swagger
 * /subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription deleted
 */
subscriptionRouter.delete("/:id", deleteSubscription);

/**
 * @swagger
 * /subscriptions/user/{id}:
 *   get:
 *     summary: Get all subscriptions for a user
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User subscriptions
 */
subscriptionRouter.get("/user/:id", authorize, getSubscription);

/**
 * @swagger
 * /subscriptions/{id}/cancel:
 *   put:
 *     summary: Cancel a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription cancelled
 */
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "CANCEL sub" });
});

/**
 * @swagger
 * /subscriptions/upcoming-renewals:
 *   get:
 *     summary: Get upcoming subscription renewals
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: List of upcoming renewals
 */
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET renewals" });
});

export default subscriptionRouter;
