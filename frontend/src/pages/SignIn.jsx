import { useState } from 'react';
import logo from '../assets/logo2.png'
import logo1 from '../assets/logo1.png'
import { IoMdEye } from "react-icons/io"
import { IoMdEyeOff } from "react-icons/io"
import { useNavigate } from 'react-router'
import { toast } from 'sonner';
import axios from 'axios';
import { urlEndpoint } from '../constants/apiUrl';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const SignIn = () => {
    const [inputClicked, setInputClicked] = useState({
        userName: false,
        password: false,
    })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const handleSignin = async () => {
        setLoading(true)
        if (!userName || !password) {
            toast.warning('Preencha todos os campos!')
            setLoading(false)
            return
        }

        try {
            const res = await axios.post(`${urlEndpoint}/auth/signin`, { userName, password },{withCredentials:true})
            dispatch(setUserData(res.data))        
        } catch (error) {
            const msg = error.response?.data?.message || "Erro ao entrar na sua conta"
            toast.error(msg)
        } finally {
            setLoading(false)
            navigate("/")
        }
    }
    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
            <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>
                <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px] justify-center'>
                    <div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
                        <span>Bem vindo de volta ao</span>
                        <img src={logo} alt='vyber logo' className='w-[70px]' />
                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, userName: true })}>
                        <label htmlFor='userName' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.userName ? " top-[-15px]" : ""}`}>Digite seu usuário</label>
                        <input type='text' id='userName' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setUserName(e.target.value)} value={userName} />

                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, password: true })}>
                        <label htmlFor='password' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.password ? " top-[-15px]" : ""}`}>Enter Your password</label>
                        <input type={showPassword ? "text" : "password"} id='password' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required  onChange={(e) => setPassword(e.target.value)} value={password} />
                        {!showPassword ? <IoMdEye className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={() => setShowPassword(true)} /> : <IoMdEyeOff className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={() => setShowPassword(false)} />}

                    </div>
                    <div className='w-[90%] px-[20px] cursor-pointer' onClick={() => navigate('/forgot-password')}>Esqueci minha senha</div>

                    <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleSignin} disabled={loading} >{loading ? <ClipLoader size={30} color='white' /> : "Entrar"}</button>
                    <p className='cursor-pointer text-gray-800' onClick={() => navigate('/signup')}>Ainda não possui uma conta ? <span className='border-b-2 border-b-black pb-[3px] text-black'>Registre-se</span></p>

                </div>
                <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>

                    <img src={logo1} alt='' className='w-[40%]' />
                    <p className='text-center px-4'>Sua vybe. Seu espaço. Sua voz.</p>


                </div>
            </div>
        </div>
    )
}

export default SignIn