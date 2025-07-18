import { Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Toaster, toast } from 'sonner';

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
    </>
  )
}

export default App