import express from "express"
import { resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp } from "../controllers/auth.controller.js"

const authRoutes = express.Router()

authRoutes.post("/signup",signUp)
authRoutes.post("/signin",signIn)
authRoutes.get("/signout",signOut)
authRoutes.post("/send-otp",sendOtp)
authRoutes.post("/verify-otp",verifyOtp)
authRoutes.post("/reset-password",resetPassword)

export default authRoutes