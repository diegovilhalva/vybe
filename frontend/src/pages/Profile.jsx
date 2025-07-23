import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router"
import { urlEndpoint } from "../constants/apiUrl";
import { setProfileData, setUserData } from "../redux/userSlice";
import { toast } from "sonner";
import { useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import dp from "../assets/dp.webp";
import Nav from "../components/Nav";

const Profile = () => {
    const { userName } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { profileData, userData } = useSelector((state) => state.user);


    const handleProfile = async () => {
        try {
            const res = await axios.get(`${urlEndpoint}/user/get-profile/${userName}`, { withCredentials: true })
            dispatch(setProfileData(res.data))
        } catch (error) {
            console.log(error)
            toast.error(error?.response.data.message)
        }
    }
    useEffect(() => {
        handleProfile();
    }, [userName, dispatch]);

    const handleLogout = async () => {
        try {
            const result = await axios.get(`${urlEndpoint}/auth/signout`, {
                withCredentials: true,
            });
            dispatch(setUserData(null));
        } catch (error) {
            console.log("erro no logout ", error);
        }
    }
    return (
        <div className="w-full min-h-screen bg-black">
            <div className="text-white w-full h-[80px] flex justify-between items-center px-[30px]">
                <div onClick={() => navigate("/")}>
                    <IoArrowBackOutline className="text-white w-[25px] h-[25px] cursor-pointer" />
                </div>
                <div className="font-semibold text-[20px]">{profileData?.userName}</div>
                <div
                    className="font-semibold cursor-pointer text-[20px] text-blue-500"
                    onClick={handleLogout}
                >
                    Sair
                </div>
            </div>
            <div className="w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
                <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img
                        src={profileData?.profileImage || dp}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <div className="font-semibold text-[22px] text-white">
                        {profileData?.name}
                    </div>
                    <div className="text-[17px] text-[#ffffffe8]">
                        {profileData?.profession || "Novo usuário"}
                    </div>
                    <div className="text-[17px] text-[#ffffffe8]">{profileData?.bio}</div>
                </div>
            </div>
            <div className="w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white">
                <div>
                    <div className="text-white text-[22px] md:text-[30px] font-semibold">
                        {profileData?.posts.length}
                    </div>
                    <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
                        Posts
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-center gap-[20px]">
                        <div className="flex relative">
                            {profileData?.followers?.slice(0, 3).map((user, index) => (
                                <div
                                    key={index}
                                    className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index * 9}px]` : ""
                                        }`}
                                >
                                    <img
                                        src={user.profileImage || dp}
                                        alt=""
                                        className="w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-white text-[22px] md:text-[30px] font-semibold">
                            {profileData?.followers.length}{" "}
                        </div>
                    </div>
                    <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
                        Seguidores
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-center gap-[20px]">
                        <div className="flex relative">
                            {profileData?.following?.slice(0, 3).map((user, index) => (
                                <div
                                    key={index}
                                    className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index * 10}px]` : ""
                                        }`}
                                >
                                    <img
                                        src={user?.profileImage || dp}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-white text-[22px] md:text-[30px] font-semibold">
                            {profileData?.following.length}
                        </div>
                    </div>
                    <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
                        Seguindo
                    </div>
                </div>

            </div>
            <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]">
                {profileData?._id == userData._id && (
                    <button
                        className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl"
                        onClick={() => navigate("/editprofile")}
                    >
                        Editar perfil
                    </button>
                )}
                {profileData?._id != userData._id && (
                    <>
                        {/* <FollowButton
                            tailwind={
                                "px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl"
                            }
                            targetUserId={profileData?._id}
                            onFollowChange={handleProfile}
                        />*/}
                        <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl" onClick={() => {
                            dispatch(setSelectedUser(profileData));
                            navigate("/messageArea")
                        }}>
                            Enviar mensagem
                        </button>
                    </>
                )}
            </div>
            <div className="w-full min-h-[100vh] flex justify-center">
                <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[100px]">
                    {/* <div className="w-[90%] max-w-[500px] h-[80px] bg-[white] rounded-full flex justify-center items-center gap-[10px]">
                    {profileData?._id == userData._id && (
                            <div
                                className={`${postType == "posts"
                                        ? "bg-black text-white shadow-2xl shadow-black"
                                        : ""
                                    }  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
                                onClick={() => setPostType("posts")}
                            >
                                Posts
                            </div>

                            { }
                            <div
                                className={`${postType == "saved"
                                        ? "bg-black text-white shadow-2xl shadow-black"
                                        : ""
                                    }  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
                                onClick={() => setPostType("saved")}
                            >
                                Saved
                            </div>
                    )}
                    </div> 
                    */}
                    <Nav />
                </div>
            </div>
        </div>
    )
}

export default Profile