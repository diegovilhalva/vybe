import express from "express"
import isAuth from "../middleware/isAuth.js"
import { editProfile, follow, followingList, getCurrentUser, getProfile, search, suggestedUsers } from "../controllers/user.controller.js"
import {upload} from "../middleware/multer.js"

const userRoutes = express.Router()

userRoutes.get("/current",isAuth,getCurrentUser)
userRoutes.get("/suggested",isAuth,suggestedUsers)
userRoutes.post("/edit-profile",isAuth,upload.single("profileImage"),editProfile)
userRoutes.get("/get-profile/:userName",isAuth,getProfile)
userRoutes.get('/follow/:targetUserId', isAuth, follow)
userRoutes.get('/followingList', isAuth, followingList)
userRoutes.get('/search', isAuth, search);
export default userRoutes