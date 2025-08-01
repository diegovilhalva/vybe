import express from "express"
import isAuth from "../middleware/isAuth.js"
import { upload } from "../middleware/multer.js"
import { comment, getAllPosts, like, saved, uploadPost } from "../controllers/post.controller.js"
const postRoutes = express.Router()

postRoutes.post("/upload", isAuth, upload.single("media"), uploadPost)
postRoutes.get("/getAll", isAuth, getAllPosts)
postRoutes.get("/like/:postId", isAuth, like)
postRoutes.get("/saved/:postId", isAuth, saved)
postRoutes.post("/comment/:postId", isAuth, comment);

export default postRoutes