import { Navigate, Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Toaster, toast } from 'sonner';
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetSuggestedUsers from "./hooks/useGetSuggestedUsers";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";


const App = () => {
  const { loading } = useGetCurrentUser();
  const { userData } = useSelector((state) => state.user)
  useGetSuggestedUsers()
  if (loading) return null; // ou um loader


  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
        <Route path="/" element={userData ? <Home /> : <SignIn />} />
        <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
        <Route path="/profile/:userName" element={userData ? <Profile /> : <Navigate to={"/signin"} />} />
           <Route path="/editprofile" element={ userData ? <EditProfile /> : <Navigate to={"/signin"} />} /> 
      </Routes>
    </>
  );
};


export default App