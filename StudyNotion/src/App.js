import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import ContactPage from "./pages/ContactPage";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Cart from "./components/core/Dashboard/Cart/index";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="signup" element={<OpenRoute><Signup/></OpenRoute>}/>
        <Route path="login" element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path="verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
        <Route path="forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
        <Route path="update-password" element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<ContactPage/>}/>
        <Route element=<PrivateRoute><Dashboard/></PrivateRoute> />        
        <Route path="dashboard/my-profile" element={<MyProfile/>} />
        {/* <Route path="dashboard/settings" element={<Setting/>} /> */}
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart/>} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
            </>
          )
        }
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
