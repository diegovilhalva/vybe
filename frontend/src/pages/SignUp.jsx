import { useState } from 'react';
import logo from '../assets/logo2.png'
import logo1 from '../assets/logo1.png'
import { IoMdEye } from "react-icons/io"
import { IoMdEyeOff } from "react-icons/io"
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import axios from "axios"
import { urlEndpoint } from '../constants/apiUrl'
import { ClipLoader } from "react-spinners"

const SignUp = () => {
    const [inputClicked, setInputClicked] = useState({
        name: false,
        userName: false,
        email: false,
        password: false,
    })
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = async () => {
        setLoading(true)
        if (!name || !userName || !email || !password) {
            toast.warning('Preencha todos os campos!')
            setLoading(false)
            return
        }

        try {
            const res = await axios.post(`${urlEndpoint}/auth/signup`, { name, userName, email, password })
        } catch (error) {
            const msg = error.response?.data?.message || "Erro ao criar conta"
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
            <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>
                <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]'>
                    <div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
                        <span>Crie sua conta na</span>
                        <img src={logo} alt='vyber logo' className='w-[70px]' />
                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, name: true })} >
                        <label htmlFor='name' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.name ? " top-[-15px]" : ""}`}>Digite seu nome</label>
                        <input type='text' id='name' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setName(e.target.value)} value={name} />

                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, userName: true })} >
                        <label htmlFor='userName' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.userName ? " top-[-15px]" : ""}`}>Digite seu usuário</label>
                        <input type='text' id='userName' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setUserName(e.target.value)} value={userName} />
                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, email: true })}>
                        <label htmlFor='email' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email ? " top-[-15px]" : ""}`}>Digite seu email</label>
                        <input type='text' id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setEmail(e.target.value)} value={email} />

                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, password: true })}>
                        <label htmlFor='password' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.password ? " top-[-15px]" : ""}`}>Digite sua senha</label>
                        <input type={showPassword ? "text" : "password"} id='password' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setPassword(e.target.value)} value={password} />
                        {!showPassword ? <IoMdEye className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={() => setShowPassword(true)} /> : <IoMdEyeOff className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={() => setShowPassword(false)} />}
                    </div>
                    <button
                        disabled={loading}
                        className={`w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px] flex items-center justify-center ${loading && 'opacity-70 cursor-not-allowed'}`}
                        onClick={handleSignup}
                    >
                        {loading ? <ClipLoader size={20} color="white" /> : "Criar conta"}
                    </button>

                    <p className='cursor-pointer text-gray-800' onClick={() => navigate('/signin')}>Já possui uma conta ? <span className='border-b-2 border-b-black pb-[3px] text-black'>Fazer login</span></p>

                </div>
                <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>

                    <img src={logo1} alt='' className='w-[40%]' />
                    <p className='text-center px-4'>Sua vybe. Seu espaço. Sua voz.</p>


                </div>
            </div>
        </div>
    )
}

export default SignUp