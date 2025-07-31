import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { urlEndpoint } from "../constants/apiUrl";
import { setNotificationData } from "../redux/userSlice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import NotificationCard from "../components/NotificationCard";
import { useEffect } from "react";


const Notifications = () => {
  const { notificationData } = useSelector((state) => state.user);
  const ids = notificationData.map((n) => n._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAsRead = async () => {
    try {
      const result = await axios.post(
        `${urlEndpoint}/user/markAsRead`,
        { notificationId: ids },
        { withCredentials: true }
      );
      await fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNotifications = async () => {
    try {
      const result = await axios.get(
        `${urlEndpoint}/user/getAllNotifications`,
        { withCredentials: true }
      );
      dispatch(setNotificationData(result.data));
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    markAsRead();
  }, []);
  return (
    <div className="w-full h-[100vh] bg-black overflow-auto">
      <div className="w-full h-[80px]  flex items-center gap-[20px] px-[20px] lg:hidden">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px]  h-[25px] "
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[20px] font-semibold">Notifications</h1>
      </div>

      <div className="w-full flex flex-col gap-[20px] h-[100%]  px-[10px]">
        {notificationData?.map((noti, index) => (
          <NotificationCard noti={noti} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Notifications