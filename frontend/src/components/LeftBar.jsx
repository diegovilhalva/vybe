import logo from "../assets/logo1.png";
import { FaRegHeart } from "react-icons/fa6"
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from "react-redux";
import OtherUser from "./OtherUser";
import axios from "axios";
import { urlEndpoint } from "../constants/apiUrl";
import { setUserData } from "../redux/userSlice";
import { useState } from "react";
import Notifications from "../pages/Notifications";

const LeftBar = () => {
    const { userData, suggestedUsers } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { notificationData } = useSelector((state) => state.user);
    const [showNotification, setShowNotification] = useState(false);
    const handleLogout = async () => {
        try {
            const res = await axios.get(`${urlEndpoint}/auth/signout`, {
                withCredentials: true
            })
            dispatch(setUserData(null));
        } catch (error) {
            console.log("Erro no logout", error)
        }
    }
    return (
        <div className={`w-[25%] hidden lg:block h-[100vh] bg-[black] border-r-2 border-gray-900  ${showNotification ? "overflow-hidden" : "overflow-auto"
            }`}>
            <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
                <img src={logo} alt="" className="w-[80px]" />
                <div
                    className="relative z-[100]"
                    onClick={() => setShowNotification((prev) => !prev)}
                >
                    <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
                    {notificationData?.length > 0 &&
                        notificationData.some((noti) => noti.isRead === false) && (
                            <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]"></div>
                        )}
                </div>
            </div>

            {!showNotification && (
                <>
                    <div className="flex items-center w-full justify-between gap-[10px] px-[10px] border-b-2 border-b-gray-900 py-[10px]">
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                                <img
                                    src={userData.profileImage || dp}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-[18px] text-white font-semibold ">
                                    {userData.userName}
                                </div>
                                <div className="text-[15px] text-gray-400 font-semibold ">
                                    {userData.name}
                                </div>
                            </div>
                        </div>
                        <div
                            className="text-blue-500 font-semibold cursor-pointer"
                            onClick={handleLogout}
                        >
                            Sair
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-[20px] p-[20px]">
                        <h1 className="text-[white] text-[19px]">Sugestão de usuários</h1>
                        {suggestedUsers &&
                            suggestedUsers
                                .slice(0, 3)
                                .map((user, index) => <OtherUser key={index} user={user} />)}
                    </div>
                </>
            )}
            
             {showNotification && <Notifications />}
        </div>
    )
}

export default LeftBar