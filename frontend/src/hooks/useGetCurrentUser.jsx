
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { urlEndpoint } from "../constants/apiUrl";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${urlEndpoint}/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log("Usuário não autenticado", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
};

export default useGetCurrentUser;
