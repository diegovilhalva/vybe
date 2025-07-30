import express  from "express"
import isAuth from "../middleware/isAuth.js"
import {upload} from "../middleware/multer.js"
import { getAllMessages, getPrevUserChats, sendMessage } from "../controllers/message.controller.js";

const messageRoutes  = express.Router()

messageRoutes.post("/send/:receiverId", isAuth, upload.single("image"), sendMessage)
messageRoutes.get("/getAll/:receiverId", isAuth, getAllMessages)
messageRoutes.get("/prevChats", isAuth, getPrevUserChats)


export default  messageRoutes