import { useState } from "react";
import dp from "../assets/dp.webp"
import { useNavigate } from "react-router";

const StoryCard = ({ storyData }) => {
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    navigate("/");
                    return 100;
                }
                return prev + 1;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [navigate])
    return (
        <div className="w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center">
            <div className="flex items-center gap-[10px] absolute top-[30px] px-[10px]">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img
                        src={storyData?.author?.profileImage || dp}
                        alt=""
                        className="w-full object-cover"
                    />
                </div>
                <div className="w-[120px] font-semibold truncate text-white ">
                    {storyData?.author?.userName}
                </div>
            </div>
            <div className="absolute top-[10px]  w-full h-[5px] bg-gray-900">
                <div
                    className="h-full w-[200px] bg-white transition-all duration-200 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="flex w-full overflow-auto gap-[20px] items-center p-[20px]">
        
            </div>

        </div>
    )
}

export default StoryCard