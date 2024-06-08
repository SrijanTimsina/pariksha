import { Router } from "express";

import {
  createQuestionSet,
  getAllQuestionSets,
  getQuestionSet,
} from "../controllers/questionset.controller.js";

const router = Router();

router.route("/create").post(createQuestionSet);
router.route("/getAllQuestionSets").get(getAllQuestionSets);
router.route("/getQuestionSetData/:link").get(getQuestionSet);

export default router;
