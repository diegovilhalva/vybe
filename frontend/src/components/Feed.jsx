import logo from "../assets/logo1.png"
import { FaRegHeart } from "react-icons/fa6"
import { BiMessageAltDetail } from "react-icons/bi"
import { urlEndpoint } from "../constants/apiUrl";
import { setUserData } from "../redux/userSlice";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import Post from "./Post";

const Feed = () => {
    const { postData } = useSelector((state) => state.post);

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
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]
            lg:hidden">
        <img src={logo} alt="" className="w-[80px]" />
        <div className="flex items-center gap-[10px]">
          <div className="relative z-[100]">
            <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
            <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]"></div>
            <BiMessageAltDetail
              className="text-white w-[25px] h-[25px]" />
          </div>
        </div>
      </div>


      <div className="flex w-full overflow-auto gap-[20px] items-center p-[20px]">
        <StoryDp userName={"Lorema"} />
        <StoryDp userName={"Lorem"} />
        <StoryDp userName={"Lorem"} />
        <StoryDp userName={"Lorem"} />
        <StoryDp userName={"Lorem"} />
        <StoryDp userName={"Lorem"} />
        <StoryDp userName={"Lorem"} />
        <StoryDp userName={"Lorem"} />
      </div>
      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav />
         {postData?.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed