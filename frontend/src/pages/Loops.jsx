import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import LoopCard from "../components/LoopCard.jsx";

const Loops = () => {

  const navigate = useNavigate();
  const { loopData } = useSelector((state) => state.loop);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex justify-center items-center ">

      <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100]'>
        <IoArrowBackOutline
          className="text-white w-[25px] h-[25px] cursor-pointer"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[20px] font-semibold">Loops</h1>
      </div>

      <div className="h-[100vh] overflow-y-auto snap-y snap-mandatory scrollbar-hide ">
        {loopData?.map((loop, index) => (
          <div className="h-screen snap-start" key={index}>
            <LoopCard loop={loop} key={index} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Loops;