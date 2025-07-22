import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import dp from "../assets/dp.webp";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useSelector((state) => state.user);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-md px-4 h-[70px] bg-black rounded-full flex justify-around items-center shadow-lg z-[100]">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <GoHomeFill className={`size-6 ${isActive("/") ? "text-white" : "text-gray-500"}`} />
      </div>
      <div onClick={() => navigate("/search")} className="cursor-pointer">
        <FaSearch className={`size-6 ${isActive("/search") ? "text-white" : "text-gray-500"}`} />
      </div>
      <div
        onClick={() => navigate("/upload")}
        className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:scale-105 transition"
      >
        <FiPlusSquare className="text-black size-6" />
      </div>
      <div onClick={() => navigate("/loops")} className="cursor-pointer">
        <RxVideo className={`size-6 ${isActive("/loops") ? "text-white" : "text-gray-500"}`} />
      </div>
      <div
        onClick={() => navigate(`/profile/${userData.userName}`)}
        className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-black cursor-pointer"
      >
        <img
          src={userData.profileImage || dp}
          alt="avatar"
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Nav;
