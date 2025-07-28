import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlEndpoint } from "../constants/apiUrl";
import { setStoryList } from "../redux/storySlice";


const useGetAllStories = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    const { storyData } = useSelector((state) => state.story);

    useEffect(() => {
        (async() => {
            try {
                const res = await axios.get(`${urlEndpoint}/story/getAll`,{
                    withCredentials:true
                })
                dispatch(setStoryList(res.data))
            } catch (error) {
                console.log(error)
            }
        })()
    },[userData,storyData])
}

export default useGetAllStories