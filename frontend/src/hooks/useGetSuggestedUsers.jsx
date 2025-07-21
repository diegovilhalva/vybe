import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { urlEndpoint } from "../constants/apiUrl";
import { setSuggestedUsers } from "../redux/userSlice";


const useGetSuggestedUsers = () => {
    const dispatch =  useDispatch()
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        (async () =>{
            try {
                const res = await  axios.get(`${urlEndpoint}/user/suggested`,{withCredentials:true})
                dispatch(setSuggestedUsers(res.data))
            } catch (error) {
                console.log(error)
            }
        })()
    },[userData])
}

export default useGetSuggestedUsers