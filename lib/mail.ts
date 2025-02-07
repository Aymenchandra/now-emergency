import nodemailer from "nodemailer";
import { emailVerification } from "@/lib/templates/emailVerification";


export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { SMTP_EMAIL, SMTP_PASSWORD, HOST } = process.env;

  const transport = nodemailer.createTransport({
    host: HOST,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: 'Two Factor Authentication Code',
      html: `<p>Your Two Factor Authentication Code: ${token}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`
  const subject = "reset your password"
  const title = "Reset Password"
  
  sendEmail(email,subject,title,resetLink)
}

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
  const subject = "confirm your email"
  const title = "Email Verification"
  
  sendEmail(email,subject,title,confirmLink)
}

const sendEmail = async (email: string, subject: string, title: string, link: string) => {
  const { SMTP_EMAIL, SMTP_PASSWORD, HOST } = process.env;

  const transport = nodemailer.createTransport({
    host: HOST,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: subject,
      html: emailVerification(email,title, link),
    });
  } catch (error) {
    console.log(error);
  }
}