import express from "express"
import isAuth from "../middleware/isAuth.js"
import { upload } from "../middleware/multer.js"
import { comment, getAllLoops, like, uploadLoop } from "../controllers/loop.controller.js"


const loopRoutes = express.Router()

loopRoutes.post("/upload", isAuth, upload.single("media"), uploadLoop)
loopRoutes.get("/getAll", isAuth, getAllLoops)
loopRoutes.get("/like/:loopId", isAuth, like)
loopRoutes.post("/comment/:loopId", isAuth, comment)

export default loopRoutes