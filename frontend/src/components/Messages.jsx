import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";


const Messages = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-[100vh] flex flex-col bg-black gap-[20px] p-[10px]">
            <div className="w-full h-[80px]  flex items-center gap-[20px] px-[20px]">
                <IoArrowBackOutline
                    className="text-white cursor-pointer lg:hidden w-[25px]  h-[25px] "
                    onClick={() => navigate(`/`)}
                />
                <h1 className="text-white text-[20px] font-semibold">Mensagens</h1>
            </div>
        </div>
    )
}

export default Messages