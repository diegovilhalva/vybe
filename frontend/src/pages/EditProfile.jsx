import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { IoArrowBackOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { urlEndpoint } from "../constants/apiUrl";
import { setProfileData, setUserData } from "../redux/userSlice";
import dp from "../assets/dp.webp";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const imageInput = useRef();
    const [frontendImage, setFrontendImage] = useState(userData.profileImage || dp);
    const [backendImage, setBackendImage] = useState(null);
    const [name, setName] = useState(userData.name || "");
    const [userName, setUserName] = useState(userData.userName || "");
    const [bio, setBio] = useState(userData.bio || "");
    const [profession, setProfession] = useState(userData.profession || "");
    const [gender, setGender] = useState(userData.gender || "");

    const [loading, setLoading] = useState(false)

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }

    const handleEditProfile = async () => {
        setLoading(true)
        try {
            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("userName", userName);
            formdata.append("bio", bio);
            formdata.append("profession", profession);
            formdata.append("gender", gender);
            if (backendImage) {
                formdata.append("profileImage", backendImage);
            }

            const res = await axios.post(`${urlEndpoint}/user/edit-profile`, formdata, { withCredentials: true })
            dispatch(setProfileData(res.data.user))
            dispatch(setUserData(res.data.user))
            navigate(`/profile/${userData.userName}`);
        } catch (error) {
            console.error("Erro ao atulizar perfil:", error);
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] p-[20px]">
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
                <IoArrowBackOutline className="text-white w-[25px] h-[25px] cursor-pointer" onClick={() => navigate(`/profile/${userData.userName}`)} />
                <h1 className="text-white text-[20px] font-semibold">Editar Perfil</h1>
            </div>
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden" onClick={() => imageInput.current.click()}>
                <input type="file" accept="image/*" ref={imageInput} hidden onChange={handleImage} />
                <img
                    src={frontendImage}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-blue-500 text-center text-[18px] font-semibold cursor-pointer" onClick={() => imageInput.current.click()} >Alterar foto de perfil</div>

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none ' placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} value={name} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none ' placeholder='Enter Your Username' onChange={(e) => setUserName(e.target.value)} value={userName} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none ' placeholder='Nos conte sobre você' onChange={(e) => setBio(e.target.value)} value={bio} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none ' placeholder='digite sua ocupação' onChange={(e) => setProfession(e.target.value)} value={profession} />

            <select
                className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="" disabled>Selecione seu gênero</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
            </select>


            <button className='px-[10px] w-[60%] max-w-[400px]   py-[5px] h-[50px] bg-[white] cursor-pointer rounded-2xl' onClick={handleEditProfile} >{loading ? <ClipLoader size={30} color='black' /> : "Salvar alterações"}</button>
        </div>
    )
}

export default EditProfile