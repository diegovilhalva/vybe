import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlEndpoint } from "../constants/apiUrl";
import { setPostData } from "../redux/postSlice";


const useGetAllPosts = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${urlEndpoint}/post/getAll`, { withCredentials: true })
                dispatch(setPostData(res.data))
            } catch (error) {
                 console.log(error);
            }
        })()
    }, [userData,dispatch])
}

export default useGetAllPosts