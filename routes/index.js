import express from "express";

import contactRoute from "./contactRoute.js";

const router = express.Router();

router.use('/contact', contactRoute);

export default router;
