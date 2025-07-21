import axios from 'axios';
import { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { urlEndpoint } from '../constants/apiUrl';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
    const [step, setStep] = useState(1)
    const [inputClicked, setInputClicked] = useState({
        email: false,
        otp: false,
        newPassword: false,
        confirmNewPassword: false,
    })
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleStep1 = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${urlEndpoint}/auth/send-otp`, { email }, { withCredentials: true })
            console.log(res)
            setStep(2)
        } catch (error) {
            const msg = error.response?.data?.message || "Erro ao tentar enviar o email"
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    const handleStep2 = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${urlEndpoint}/auth/verify-otp`, { email, otp }, { withCredentials: true })
            setStep(3)
        } catch (error) {
            const msg = error.response?.data?.message || "Erro ao tentar verifcar o OTP"
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    const handleStep3 = async () => {
        setLoading(true)
        try {
            if (newPassword !== confirmNewPassword) {
                setLoading(false);
                toast.error("As senhas não são iguais")
            }
            const res = await axios.post(`${urlEndpoint}/auth/reset-password`, { email, password: newPassword }, { withCredentials: true })
            if (res.status === 200) {
                navigate("/signin")
            }

            
        } catch (error) {
            const msg = error.response?.data?.message || "Erro ao tentar redefinir a senha"
            toast.error(msg)
        } finally {
            setLoading(false)
            
        }
    }

    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
            {step == 1 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>

                <h2 className='text-[30px] font-semibold'>Redefinir senha</h2>
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]' onClick={() => setInputClicked({ ...inputClicked, email: true })}>

                    <label htmlFor='email' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email ? " top-[-15px]" : ""}`}>Digite seu email</label>
                    <input type='text' id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setEmail(e.target.value)} value={email} />

                </div>


                <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' disabled={loading} onClick={handleStep1}>{loading ? <ClipLoader size={30} color='white' /> : "Enviar OTP"}</button>

            </div>}
            {step == 2 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>

                <h2 className='text-[30px] font-semibold'>Redefinir senha</h2>
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]' onClick={() => setInputClicked({ ...inputClicked, otp: true })}>

                    <label htmlFor='otp' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp ? " top-[-15px]" : ""}`}>digite seu OTP</label>
                    <input type='text' id='otp' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setOtp(e.target.value)} value={otp} />

                </div>



                <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleStep2} disabled={loading}>{loading ? <ClipLoader size={30} color='white' /> : "Submit"}</button>

            </div>}

            {step == 3 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>

                <h2 className='text-[30px] font-semibold'>Redefinir senha</h2>
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]' onClick={() => setInputClicked({ ...inputClicked, newPassword: true })}>

                    <label htmlFor='newPassword' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.newPassword ? " top-[-15px]" : ""}`}>Digite sua nova senha</label>
                    <input type='text' id='newPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />

                </div>

                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]' onClick={() => setInputClicked({ ...inputClicked, confirmNewPassword: true })}>

                    <label htmlFor='confirmNewPassword' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.confirmNewPassword ? " top-[-15px]" : ""}`}>Confirme nova senha</label>
                    <input type='text' id='confirmNewPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} />

                </div>



                <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleStep3} disabled={loading}>{loading ? <ClipLoader size={30} color='white' /> : "Redefinir senha"}</button>

            </div>


            }
        </div>
    )
}

export default ForgotPassword