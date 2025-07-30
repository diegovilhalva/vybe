import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { urlEndpoint } from "../constants/apiUrl";
import { setPrevChatUsers } from "../redux/messageSlice";
import { useEffect } from "react";


const useGetPrevChatUsers = () => {
    const dispatch = useDispatch();
    const { storyData } = useSelector((state) => state.story);
    const { message } = useSelector((state) => state.message);
        useEffect(() => {
            (async () => {
                try {
                    const res = await axios.get(`${urlEndpoint}/message/prevChats`,{withCredentials:true})
                    dispatch(setPrevChatUsers(res.data))
                } catch (error) {
                    console.log(error)
                }
            })()
        },[message])
}

export default useGetPrevChatUsers