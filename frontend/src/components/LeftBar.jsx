import logo from "../assets/logo1.png";
import { FaRegHeart } from "react-icons/fa6"
import dp from "../assets/dp.webp"
import { useSelector } from "react-redux";

const LeftBar = () => {
    const { userData } = useSelector(state => state.user)
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
                    className="text-blue-500 font-semibold cursor-pointer">
                    Sair
                </div>
            </div>
            <div className="w-full flex flex-col gap-[20px] p-[20px]">
                <h1 className="text-[white] text-[19px]">Usuários recomendados</h1>
            </div>

        </div>
    )
}

export default LeftBar