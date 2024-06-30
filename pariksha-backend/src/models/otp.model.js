import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
  contactNumber: { type: Number, required: true, index: true },
  otp: { type: Number, required: true, index: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    console.log(this.contactNumber, this.otp);
    // await sendOtp(this.contactNumber, this.otp);
  }
  next();
});

export const Otp = mongoose.model("Otp", otpSchema);
