
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { urlEndpoint } from "../constants/apiUrl";
import { setCurrentUserStory } from "../redux/storySlice";

const useGetCurrentUser = () => {
  const { storyData } = useSelector((state) => state.story)
  const dispatch = useDispatch();
 
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${urlEndpoint}/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
        dispatch(setCurrentUserStory(res.data.story))

      } catch (error) {
        console.log("Usuário não autenticado", error);
      }
    })();
  }, []);

 
};

export default useGetCurrentUser;
