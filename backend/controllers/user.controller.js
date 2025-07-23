import User from "../models/user.model.js"
import '../models/post.model.js'
import "../models/loop.model.js"
import uploadOnCloudinary from "../config/upload.js";


export const getCurrentUser = async (req, res) => {

    try {

        const userId = req.userId;
        const user = await User.findById(userId).populate("posts loops").populate("posts loops posts.author posts.comments saved saved.author");
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        return res.status(200).json(user);

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: `erro ao carregar o usuário ${error}` })
    }
}


export const suggestedUsers = async (req, res) => {

    try {

        const users = await User.find({
            _id: { $ne: req.userId }
        })
            .select("-password")

        res.status(200).json(users);

    }
    catch (error) {
        return res.status(500).json({ message: `sugestão de usuários ${error}` });
    }

}


export const editProfile = async (req, res) => {
    try {
        const { name, userName, bio, profession, gender } = req.body;


        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Usário não encontrado" });
        }

        const sameUserWithUserName = await User.findOne({ userName }).select(
            "-password"
        );

        if (
            sameUserWithUserName &&
            sameUserWithUserName._id.toString() !== req.userId
        ) {
            return res.status(400).json({ message: "Nome de usuário já existe" });
        }

        let profileImage = user.profileImage;
        if (req.file) {
            profileImage = await uploadOnCloudinary(req.file.path);
        }

        user.name = name;
        user.userName = userName;
        user.bio = bio;
        user.profession = profession;
        user.gender = gender;
        user.profileImage = profileImage;

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message: "Perfil atualizado com sucesso",
            user: userResponse,
        })
        
    } catch (error) {
        return res.status(500).json({ message: `Erro ao editar perfil  ${error}` });
    }
};