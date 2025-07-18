import { Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Toaster, toast } from 'sonner';
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
    </>
  )
}

export default App