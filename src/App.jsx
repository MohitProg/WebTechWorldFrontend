import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Blog from "./Pages/Blog";

import About from "./Pages/About";
import NewsLetter from "./Pages/NewsLetter";
import Navbar from "./components/Navbar";
import Singleblog from "./Pages/Singleblog";
import Fotter from "./components/Fotter";
import NewsLatter from "./components/NewsLatter";
import ScrollToTop from "./components/ScrollToTop";
import Filter from "./components/Filter";
import { Login } from "@mui/icons-material";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Profilepage from "./Pages/Profilepage";
import AdminPage from "./Pages/AdminPage";
import Allblogpage from "./Pages/Allblogpage";
import AlluserPage from "./Pages/AlluserPage";
import ChartviewPage from "./Pages/ChartviewPage";
import Addblog from "./Pages/Addblog";
import Verfiyotp from "./Pages/verfiyotp";
import { Toaster } from "react-hot-toast";
import Auth from "./utils/Auth";


function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <ScrollToTop />
        {["/login", "/signup", "/verifyotp"].includes(
          window.location.pathname
        ) ? (
          ""
        ) : (
          <>
            <Navbar />
            {/* <Filter /> */}
          </>
        )}

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verifyotp" element={<Verfiyotp />} />

          {/* Protected routes */}
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/category?" element={<Home />} />
            {/* <Route path="blog" element={<Blog />} /> */}

            <Route path="blog/:id" element={<Singleblog />} />
          

            {/* Profile page routing */}
            <Route element={<Auth />}>
              <Route path="profile" element={<Profilepage />} />

              {/* Admin page routing */}
              {/* <Route path="admin" element={<AdminPage />}>
                <Route path="allblog" element={<Allblogpage />} />
                <Route path="alluser" element={<AlluserPage />} />
                <Route path="chartview" element={<ChartviewPage />} />
              </Route> */}

              {/* Other protected routes */}
              <Route path="updateblog/:id" element={<Addblog />} />
              <Route path="addblog" element={<Addblog />} />
            </Route>

            <Route path="about" element={<About />} />
          </Route>
        </Routes>

        {["/login", "/signup", "/verifyotp"].includes(
          window.location.pathname
        ) ? (
          ""
        ) : (
          <>
            {/* <NewsLatter /> */}
            <Fotter />
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
