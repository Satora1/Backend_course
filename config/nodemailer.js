import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";
export const accountEmail = "satorakuba@gmail.com"
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "satorakuba@gmail.com",
        pass: EMAIL_PASSWORD
    }
});


export default transporter;