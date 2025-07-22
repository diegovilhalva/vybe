import logo from "../assets/logo1.png";
import { FaRegHeart } from "react-icons/fa6"
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from "react-redux";
import OtherUser from "./OtherUser";
import axios from "axios";
import { urlEndpoint } from "../constants/apiUrl";
import { setUserData } from "../redux/userSlice";

const LeftBar = () => {
    const { userData, suggestedUsers } = useSelector(state => state.user)
    const dispatch = useDispatch()
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
        <div className='w-[25%] hidden lg:block min-h-[100vh] bg-black border-r-2 border-gray-900'>
            <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
                <img src={logo} alt="" className="w-[80px]" />
                <div className="relative z-[100]">
                    <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
                </div>
            </div>

            <div className="flex  items-center gap-[10px]">
                <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img src={userData.profileImage || dp} alt={userData.name} className="w-full object-cover" />
                </div>
                <div>
                    <div className="text-[18px] text-white font-semibold ">
                        {userData.userName}
                    </div>
                    <div className="text-[15px] text-gray-400 font-semibold ">
                        {userData.name}
                    </div>
                </div>
                <div
                    onClick={handleLogout}
                    className="text-blue-500 font-semibold cursor-pointer">
                    Sair
                </div>
            </div>
            <div className="w-full flex flex-col gap-[20px] p-[20px]">
                <h1 className="text-[white] text-[19px]">Usuários recomendados</h1>
                {suggestedUsers &&
                    suggestedUsers
                        .slice(0, 3)
                        .map((user, index) => <OtherUser key={index} user={user} />)}
            </div>

        </div>
    )
}

export default LeftBar