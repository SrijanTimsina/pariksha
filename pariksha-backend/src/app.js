import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import subjectRouter from "./routes/subject.route.js";
import sectionRouter from "./routes/section.route.js";
import videoRouter from "./routes/video.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/subject", subjectRouter);
app.use("/api/v1/section", sectionRouter);
app.use("/api/v1/video", videoRouter);

export { app };
