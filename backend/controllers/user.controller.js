import User from "../models/user.model.js"
import '../models/post.model.js'
import "../models/loop.model.js"
import uploadOnCloudinary from "../config/upload.js";
import Notification from "../models/notificaton.model.js";
import { getSocketId, io } from "../socket.js";


export const getCurrentUser = async (req, res) => {

    try {

        const userId = req.userId;
        const user = await User.findById(userId).populate("posts loops").populate("posts loops posts.author posts.comments story saved saved.author following");
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


export const getProfile = async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await User.findOne({ userName })
            .select("-password")
            .populate("posts loops followers following");
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Erro ao buscar perfil` });
    }
}



export const follow = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const targetUserId = req.params.targetUserId;


        if (!targetUserId) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        if (currentUserId == targetUserId) {
            return res.status(400).json({ message: "Você não pode seguir a si mesmo" });
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        const isFollowing = currentUser.following.includes(targetUserId);
        if (isFollowing) {
            currentUser.following = currentUser.following.filter(
                (id) => id.toString() != targetUserId.toString()
            );
            targetUser.followers = targetUser.followers.filter(
                (id) => id.toString() != currentUserId.toString()
            );

            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({
                message: "Voce deixou de seguir este usuário",
                following: false,
            });
        } else {
            currentUser.following.push(targetUserId);
            targetUser.followers.push(currentUserId);
            
          if (currentUser._id != targetUser._id) {
            const notification = await Notification.create({
              sender: req.userId,
              receiver: targetUserId,
              type: "follow",
              // post: loop._id,
              message: `começou a seguir você`,
            });
            const populatedNotification = await Notification.findById(
              notification._id
            ).populate("sender receiver");
    
            const receiverSocketId = getSocketId(targetUserId);
            if (receiverSocketId) {
              io.to(receiverSocketId).emit(
                "newNotification",
                populatedNotification
              );
            }
          } 

            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({
                message: "Agora você está seguindo este usuário",
                following: true,
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Erro no servidor` });
    }
};


export const followingList = async (req, res) => {
    try {
        const result = await User.findById(req.userId);
        return res.status(200).json(result?.following);
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ message: `Erro ao carregar seguidores` });
    }
}

export const search = async (req, res) => {
    try {
        const keyWord = req.query.keyWord;
        if (!keyWord) {
            return res.status(400).json({ message: "Digite uma palavra-chave" });
        }

        const users = await User.find({
            $or: [
                { userName: { $regex: keyWord, $options: "i" } },
                { name: { $regex: keyWord, $options: "i" } },
            ],
        }).select("-password");

        return res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({
                message: `Erro ao pesquisar usuário`,
            });
    }
};


export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.userId,
    }).populate("sender receiver post loop").sort({ createdAt: -1 });

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({
        message: `erro nas notificações`,
      });
  }
};



export const markAsRead = async (req, res) => {
  // try{
  //     const notificationId = req.params.notificationId;
  //     const notification = await Notification.findById(notificationId)
  //         .populate("sender receiver post loop");

  //     notification.isRead = true;
  //     await notification.save();

  //     return res.status(200).json({message: "marked as read"});
  // }
  try {
    const { notificationId } = req.body;

    if (Array.isArray(notificationId)) {
     
      await Notification.updateMany(
        { _id: { $in: notificationId }, receiver: req.userId },
        { $set: { isRead: true } }
      );
    } else {
     
      await Notification.findOneAndUpdate(
        { _id: notificationId, receiver: req.userId },
        { $set: { isRead: true } }
      );
    }
    return res.status(200).json({ message: "marcada como lida" });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({
        message: `Erro ao marcar como lida`,
      });
  }
};