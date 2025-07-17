import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controllers/user.controller.js"


const userRoutes = express.Router()

userRoutes.get("/current",isAuth,getCurrentUser)


export default userRoutes