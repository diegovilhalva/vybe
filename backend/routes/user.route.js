import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser, suggestedUsers } from "../controllers/user.controller.js"


const userRoutes = express.Router()

userRoutes.get("/current",isAuth,getCurrentUser)
userRoutes.get("/suggested",isAuth,suggestedUsers)

export default userRoutes