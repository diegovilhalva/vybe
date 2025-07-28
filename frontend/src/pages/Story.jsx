import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { urlEndpoint } from "../constants/apiUrl";
import { setStoryData } from "../redux/storySlice";
import { toast } from "sonner";
import StoryCard from "../components/StoryCard";
import { useEffect } from "react";


const Story = () => {
    const { userName } = useParams()
    const dispatch = useDispatch();
    const { storyData } = useSelector((state) => state.story);
    const handleStory = async () => {
        try {
            const res = await axios.get(`${urlEndpoint}/story/getByUserName/${userName}`, { withCredentials: true })
            dispatch(setStoryData(res.data));
        } catch (error) {
            toast.error(error.response.data.message || "Erro ao carregar story")
        }
    }
    useEffect(() => {
        if (userName) {
            handleStory();
        }
    }, [userName]);
    return (
        <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
            <StoryCard storyData={storyData} />
        </div>
    )
}

export default Story