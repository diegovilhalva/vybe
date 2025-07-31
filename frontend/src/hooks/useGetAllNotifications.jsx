import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlEndpoint } from "../constants/apiUrl";
import { setNotificationData } from "../redux/userSlice";


const useGetAllNotifications = () => {
   const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
        try {
            const res = await axios.get(`${urlEndpoint}/user/getAllNotifications`, { withCredentials: true })
               dispatch(setNotificationData(res.data));
        } catch (error) {
            console.log(error)
        }
    })()
  },[dispatch, userData])
}

export default useGetAllNotifications