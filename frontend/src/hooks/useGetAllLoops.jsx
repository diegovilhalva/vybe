import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlEndpoint } from "../constants/apiUrl";
import { setLoopData } from "../redux/loopSlice";


const useGetAllLoops = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${urlEndpoint}/loop/getAll`,{withCredentials:true})
                dispatch(setLoopData(res.data))
            } catch (error) {
                 console.log(error)
            }
        })()
    },[userData,dispatch])    

}

export default useGetAllLoops