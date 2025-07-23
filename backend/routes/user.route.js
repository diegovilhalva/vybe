import express from "express"
import isAuth from "../middleware/isAuth.js"
import { editProfile, getCurrentUser, suggestedUsers } from "../controllers/user.controller.js"
import {upload} from "../middleware/multer.js"

const userRoutes = express.Router()

userRoutes.get("/current",isAuth,getCurrentUser)
userRoutes.get("/suggested",isAuth,suggestedUsers)
userRoutes.post("/edit-profile",isAuth,upload.single("profileImage"),editProfile)

export default userRoutes