import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";
import connectDB from "../db";
import nodemailer from "nodemailer";

// Gmail SMTP via nodemailer — uses an App Password, not your actual Gmail password
// App Passwords are generated in Google Account > Security > 2-Step Verification > App passwords
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  pool: true,
});

const mongooseInstance = await connectDB();
const client = mongooseInstance.connection.getClient();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  // session lasts 7 days, refreshes every 24 hours if the user is active
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        const info = await transporter.sendMail({
          from: `"Venarium" <${process.env.GMAIL_USER}>`,
          to: user.email,
          subject: "Reset your Venarium password",
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
              <h1 style="font-size: 24px; font-weight: bold; color: #0D0A0B; margin-bottom: 8px;">Reset your password</h1>
              <p style="color: #6B6B6B; margin-bottom: 24px;">Click the button below to reset your Venarium password. This link expires in 1 hour.</p>
              <a href="${url}" style="display: inline-block; background: #5603AD; color: white; padding: 12px 24px; text-decoration: none; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">Reset Password</a>
              <p style="color: #6B6B6B; font-size: 12px; margin-top: 24px;">If you didn't request this, you can safely ignore this email.</p>
            </div>
          `,
        });
        console.log("Reset email sent:", info.response);
      } catch (err) {
        console.error("Reset email error:", err);
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      console.log("Sending verification email to:", user.email, "URL:", url);
      try {
        const info = await transporter.sendMail({
          from: `"Venarium" <${process.env.GMAIL_USER}>`,
          to: user.email,
          subject: "Verify your Venarium email",
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
              <h1 style="font-size: 24px; font-weight: bold; color: #0D0A0B; margin-bottom: 8px;">Verify your email</h1>
              <p style="color: #6B6B6B; margin-bottom: 24px;">Thanks for signing up for Venarium! Click the button below to verify your email address.</p>
              <a href="${url}" style="display: inline-block; background: #5603AD; color: white; padding: 12px 24px; text-decoration: none; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">Verify Email</a>
              <p style="color: #6B6B6B; font-size: 12px; margin-top: 24px;">If you didn't create an account, you can safely ignore this email.</p>
            </div>
          `,
        });
        console.log("Verification email sent:", info.response);
      } catch (err) {
        console.error("Verification email error:", err);
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // after a new user is created, automatically set up their default kanban board
  // this runs for both email signup and Google OAuth
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            await initializeUserBoard(user.id);
          }
        },
      },
    },
  },
});

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  return result;
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}
