import logo from "../assets/logo1.png"
import { FaRegHeart } from "react-icons/fa6"
import { BiMessageAltDetail } from "react-icons/bi"
import { urlEndpoint } from "../constants/apiUrl";
import { setUserData } from "../redux/userSlice";

const Feed = () => {

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${urlEndpoint}/auth/signout`, {
        withCredentials: true,
      });
      dispatchEvent(setUserData(null));
    } catch (error) {
      console.log("erro sair da aplicação ", error);
    }
  };
    return (
        <div className="lg:w-[50%] min-h-[100vh] bg-[black] w-full lg:h-[100vh] relative lg:overflow-y-auto">
            <div
                className="w-full h-[100px] flex items-center justify-between p-[20px]
            lg:hidden"
            >
                <img src={logo} alt="" className="w-[80px]" />
            </div>

            <div className="flex items-center gap-[10px]">
                <div className="relative z-[100]">
                    <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
                    <BiMessageAltDetail
                        className="text-white w-[25px] h-[25px]" />
                </div>
            </div>
            <div className="flex w-full overflow-auto gap-[20px] items-center p-[20px]">

            </div>
            <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">

            </div>
        </div>
    )
}

export default Feed