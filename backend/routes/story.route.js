import express from "express"
import isAuth from "../middleware/isAuth.js"
import { upload } from "../middleware/multer.js"
import { getAllStories, getStoryByUserName, uploadStory, viewStory } from "../controllers/story.controller.js"

const storyRoutes = express.Router()

storyRoutes.post("/upload", isAuth, upload.single("media"), uploadStory)
storyRoutes.get("/getByUserName/:userName", isAuth, getStoryByUserName)
storyRoutes.get("/view/:storyId", isAuth, viewStory)
storyRoutes.get("/getAll", isAuth, getAllStories)

export default storyRoutes