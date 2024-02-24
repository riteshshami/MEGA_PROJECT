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
import Setting from "./components/core/Dashboard/Settings";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import Error from "./pages/Error";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import Sidebar from "./components/core/Dashboard/Sidebar";
import MyCourses from "./components/core/Dashboard/MyCourses";
import Catalog from "./pages/Catalog";
import EditCourse from "./components/core/Dashboard/EditCourse/index";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="catalog/:catalogName" element={<Catalog/>}/>
        <Route path="courses/:courseId" element={<CourseDetails/>}/>
        <Route path="signup" element={<OpenRoute><Signup/></OpenRoute>}/>
        <Route path="login" element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path="verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
        <Route path="forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
        <Route path="update-password" element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<ContactPage/>}/>

        {/* Private Route */}
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>        
        <Route path="dashboard/my-profile" element={<MyProfile/>} />
        <Route path="dashboard/sidebar" element={<Sidebar/>} />
        <Route path="dashboard/settings" element={<Setting/>} />

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/purchase-history" element={<Cart/>} />
              <Route path="dashboard/cart" element={<Cart/>} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
            </>
          )
        }

        {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
            <Route path="dashboard/instructor" element={<Instructor/>} />
            <Route path="dashboard/add-course" element={<AddCourse/>}/>
            <Route path="dashboard/my-courses" element={<MyCourses/>}/>
            <Route path="dashboard/edit-course" element={<EditCourse/>}/>
            </>
          )
        }
        </Route>
        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
          )
        }
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
