import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Toaster, toast } from 'sonner';
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetSuggestedUsers from "./hooks/useGetSuggestedUsers";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Upload from "./pages/Upload";
import useGetAllPosts from "./hooks/useGetAllPosts";
import useGetFollowingList from "./hooks/useGetFollowingList";
import Loops from "./pages/Loops";
import useGetAllLoops from "./hooks/useGetAllLoops";
import Story from "./pages/Story";
import useGetAllStories from "./hooks/useGetAllStories";
import Messages from "./components/Messages";
import { io } from 'socket.io-client'
import MessagesArea from "./pages/MessagesArea";
import useGetPrevChatUsers from "./hooks/useGetPrevChatUsers";
import { setOnlineUsers, setSocket } from "./redux/socketSlice";
import Search from "./pages/Search";



const App = () => {

  const { userData } = useSelector((state) => state.user)
  const { socket } = useSelector((state) => state.socket)
  const dispatch = useDispatch();
  useGetCurrentUser()
  useGetSuggestedUsers()
  useGetAllPosts()
  useGetFollowingList()
  useGetAllLoops()
  useGetAllStories()
  useGetPrevChatUsers()


  useEffect(() => {
    if (userData) {
      const socketIo = io(
        'http://localhost:4000', {
        query: {
          userId: userData._id
        }
      }
      )
      dispatch(setSocket(socketIo))

      socketIo.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUsers(users));
         //console.log("Online Users: ", users);
      });
      return () => socketIo.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }

  }, [userData])

  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
        <Route path="/" element={userData ? <Home /> : <SignIn />} />
        <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
        <Route path="/profile/:userName" element={userData ? <Profile /> : <Navigate to={"/signin"} />} />
        <Route path="/editprofile" element={userData ? <EditProfile /> : <Navigate to={"/signin"} />} />
        <Route path="/upload" element={userData ? <Upload /> : <Navigate to={"/signin"} />} />
        <Route path='/loops' element={userData ? <Loops /> : <Navigate to={"/signin"} />} />
        <Route path='/story/:userName' element={userData ? <Story /> : <Navigate to={"/signin"} />} />
        <Route path='/messages' element={userData ? <Messages /> : <Navigate to={"/signin"} />} />
        <Route path='/messageArea' element={userData ? <MessagesArea /> : <Navigate to={"/signin"} />} />
         <Route path='/search' element={ userData ? <Search /> : <Navigate to={"/signin"} />} />
      </Routes>
    </>
  );
};


export default App