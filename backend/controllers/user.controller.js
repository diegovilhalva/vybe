import User from "../models/user.model.js"
import '../models/post.model.js'
import "../models/loop.model.js"


export const getCurrentUser = async (req, res) => {

    try{

        const userId = req.userId;
        const user = await User.findById(userId).populate("posts loops").populate("posts loops posts.author posts.comments saved saved.author");
        if(!user){
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        return res.status(200).json(user);

    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message: `erro ao carregar o usuário ${error}` })
    }
}


export const suggestedUsers = async (req, res) => {

    try{

        const users = await User.find({
            _id: { $ne: req.userId } 
        })
        .select("-password")

        res.status(200).json(users);

    }
    catch(error){
        return res.status(500).json({ message: `sugestão de usuários ${error}` });
    }

}