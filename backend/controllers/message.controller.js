import uploadOnCloudinary from "../config/upload.js"
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getSocketId, io } from '../socket.js';
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId
        const receiverId = req.params.receiverId
        const { message } = req.body

        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }

        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            message,
            image
        });

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });


        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [newMessage._id]
            });
        }
        else {
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }
        const receiverSocketId = getSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(200).json({ newMessage })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Erro ao enviar mensagem` });
    }
}

export const getAllMessages = async (req, res) => {

    try {
        const senderId = req.userId;
        const receiverId = req.params.receiverId;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages');


        return res.status(200).json(conversation.messages);
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Erro ao carregar mensagens` });
    }

}



export const getPrevUserChats = async (req, res) => {

    try {
        const currentUserId = req.userId;
        const Conversations = await Conversation.find({
            participants: currentUserId
        }).populate('participants').sort({ updatedAt: -1 });

        const userMap = {};
        Conversations.forEach(conv => {
            conv.participants.forEach(user => {
                if (user._id != currentUserId) {
                    userMap[user._id] = user;
                }
            })
            
        })
        const previousUsers = Object.values(userMap);
        return res.status(200).json(previousUsers);
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Erro ao carregar chats` });
    }

}