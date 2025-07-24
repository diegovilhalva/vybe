import uploadOnCloudinary from "../config/upload.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js"


export const uploadStory = async (req, res) => {

    try {

        const user = await User.findById(req.userId);
        if (user.story) {
            await Story.findByIdAndDelete(user.story);
            user.story = null;
        }

        const { mediaType } = req.body
        let media
        if (req.file) {
            media = await uploadOnCloudinary(req.file.path)
        }
        else {
            return res.status(400).json({ message: "Arquivo de mídia é obrigatório." });
        }

        const story = await Story.create({
            author: req.userId,
            mediaType,
            media
        });
        user.story = story._id;
        await user.save();

        const populatedStory = await Story.findById(story._id)
            .populate("author", "name userName profileImage")
            .populate("viewers", "name userName profileImage");

        return res.status(201).json(populatedStory);

    }
    catch (error) {
        console.error("Erro  no upload do story:", error);
        return res.status(500).json({ message: "Erro ao criar story" });
    }

}


export const viewStory = async (req, res) => {

    try {

        const storyId = req.params.storyId;
        const story = await Story.findById(storyId);

        if (!story) {
            return res.status(404).json({ message: "Story não encontrado" });
        }

        const viewersIds = story.viewers.map(id => id.toString());
        if (!viewersIds.includes(req.userId)) {
            story.viewers.push(req.userId);
            await story.save();
        }

        const populatedStory = await Story.findById(story._id)
            .populate("author", "name userName profileImage")
            .populate("viewers", "name userName profileImage");

        return res.status(200).json(populatedStory);

    }
    catch (error) {
        console.error("Erro  no  story:", error);
        return res.status(500).json({ message: "Erro ao visualizar story" });
    }

}

export const getStoryByUserName = async (req, res) => {

    try {
        const userName = req.params.userName;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const story = await Story.findOne({ author: user._id })
            .populate("viewers author");


        return res.status(200).json(story);
    }
    catch (error) {
        console.error("Erro  ao carregar story:", error);
        return res.status(500).json({ message: "Erro ao carregar story" });
    }

}


export const getAllStories = async (req, res) => {

    try{
        const currentUser = await User.findById(req.userId);
        const followingIds = currentUser.following;

        const stories = await Story.find({ 
            author: { $in: followingIds }
        })
        .populate("viewers author")
        .sort({ createdAt: -1 });

        return res.status(200).json(stories);

    }
    catch(error){
         console.error("Erro  ao carregar stories:", error);
        return res.status(500).json({ message: "Erro ao carregar stories" });
    }

}