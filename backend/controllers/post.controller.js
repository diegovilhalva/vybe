import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/upload.js"

export const uploadPost = async (req, res) => {
    try {
        const { caption, mediaType } = req.body
        console.log(req.file)

        let media;
        if (req.file) {
            media = await uploadOnCloudinary(req.file.path);
        }
        else {
            return res.status(400).json({ message: "Arquivo de mídia é obrigatório." })
        }

        const post = await Post.create({
            caption,
            media,
            mediaType,
            author: req.userId
        });

        const user = await User.findById(req.userId);
        user.posts.push(post._id);
        await user.save();

        const populatedPost = await Post.findById(post._id)
            .populate("author", "name userName profileImage");

        return res.status(201).json(populatedPost);
    } catch (error) {
        console.error("Erro ao criar post:", error);
        return res.status(500).json({ message: "Erro interno ao criar post. Tente novamente mais tarde." });
    }
}

export const getAllPosts = async (req, res) => {

    try {

        const posts = await Post.find({})
            .populate("author", "name userName profileImage")
            .populate("comments.author", "name userName profileImage")
            .sort({ createdAt: -1 });
        return res.status(200).json(posts);
    }
    catch (error) {
        console.error("Erro ao carregar posts:", error);
        return res.status(500).json({ message: "Erro interno ao carregar posts." });

    }

}


export const comment = async (req, res) => {

    try {

        const { message } = req.body;
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (!message || message.trim() === "") {
            return res.status(400).json({ message: "Mensagem do comentário não pode estar vazia." });
        }

        if (!post) {
            return res.status(404).json({ message: "Post não encontrado" });
        }

        post.comments.push({
            author: req.userId,
            message: message,
        });
        /*
        if(post.author._id != req.userId){
            const notification = await Notification.create({
                sender: req.userId,
                receiver: post.author,
                type: "comment",
                post: post._id,
                message: `commentou no seu post`
            });
            const populatedNotification = await Notification.findById(notification._id)
                .populate("sender receiver post");

            const receiverSocketId = getSocketId(post.author);
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newNotification", populatedNotification);
            }
        }*/

        await post.save();

        await post.populate("author", "name userName profileImage");
        await post.populate("comments.author");
        /*
        io.emit("commentPost", {
            postId: post._id,
            comments: post.comments
        });*/

        return res.status(200).json(post);

    }
    catch (error) {
        console.error("Erro ao comentar:", error);
        return res.status(500).json({ message: "Erro ao adicionar comentário." });
    }

}



export const like = async (req, res) => {

    try {

        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post não encontrado" });
        }

        const alreadyLiked = post.likes.some(id => id.toString() == req.userId);
        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id.toString() != req.userId.toString());
        }
        else {
            post.likes.push(req.userId);
            /* if(post.author._id != req.userId){
                 const notification = await Notification.create({
                     sender: req.userId,
                     receiver: post.author,
                     type: "like",
                     post: post._id,
                     message: `curtiu seu post`
                 });
                 const populatedNotification = await Notification.findById(notification._id)
                     .populate("sender receiver post");
 
                 const receiverSocketId = getSocketId(post.author);
                 if(receiverSocketId){
                     io.to(receiverSocketId).emit("newNotification", populatedNotification);
                 }
             }
             */
        }

        await post.save();
        await post.populate("author", "name userName profileImage");

        /* io.emit("likedPost", {
             postId: post._id,
             likes: post.likes
         });*/

        return res.status(200).json(post);

    }
    catch (error) {
        console.error("Erro ao curtir post:", error);
        return res.status(500).json({ message: "Erro interno ao curtir post." });
    }

}

export const saved = async (req, res) => {

    try {

        const postId = req.params.postId;
        const user = await User.findById(req.userId);

        const alreadySaved = user.saved.some(id => id.toString() == postId.toString());
        if (alreadySaved) {
            user.saved = user.saved.filter(id => id.toString() != postId.toString());
        }
        else {
            user.saved.push(postId);
        }

        await user.save();
        await user.populate("saved");

        return res.status(200).json(user);

    }
    catch (error) {
        console.error("Erro ao salvar post:", error);
        return res.status(500).json({ message: "Erro interno ao salvar/remover post dos salvos." });

    }

}
