import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN;

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import subjectRouter from "./routes/subject.route.js";
import sectionRouter from "./routes/section.route.js";
import videoRouter from "./routes/video.route.js";
import questionSetRouter from "./routes/questionset.route.js";
import formSubmissionRouter from "./routes/formSubmission.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/subject", subjectRouter);
app.use("/api/v1/section", sectionRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/questionset", questionSetRouter);
app.use("/api/v1/formSubmission", formSubmissionRouter);

export { app };
