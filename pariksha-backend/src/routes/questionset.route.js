import { Router } from "express";

import {
  createQuestionSet,
  getAllQuestionSets,
  getQuestionSet,
  submitTestAnswers,
} from "../controllers/questionset.controller.js";

const router = Router();

router.route("/create/:type").post(createQuestionSet);
router.route("/getAllQuestionSets").get(getAllQuestionSets);
router.route("/getQuestionSetData/:link").get(getQuestionSet);
router.route("/submitTestAnswers/:id").post(submitTestAnswers);

export default router;
