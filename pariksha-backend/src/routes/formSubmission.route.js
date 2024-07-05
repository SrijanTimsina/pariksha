import { Router } from "express";
import {
  addFormSubmission,
  getFormSubmissions,
} from "../controllers/formSubmission.controller.js";

const router = Router();

router.route("/getFormSubmissions").get(getFormSubmissions);
router.route("/addFormSubmission").post(addFormSubmission);

export default router;
