import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlEndpoint } from "../constants/apiUrl";
import { setFollowing } from "../redux/userSlice";


const useGetFollowingList = () => {
    const dispatch = useDispatch();
    const { storyData } = useSelector((state) => state.story)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${urlEndpoint}/user/followingList`,{withCredentials:true})
                dispatch(setFollowing(res.data))
            } catch (error) {
                console.log(error)
            }
        })()
    },[storyData])
 
}

export default useGetFollowingList