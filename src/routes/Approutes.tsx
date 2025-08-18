import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NewsDetail from "../pages/newsdetail"
import AdminHome from "../admindashboard/adminhome";
import AdminNewsPage from "../admindashboard/AdminNewsPage";
import AdminLoginPage from "../admindashboard/AdminLoginPage.jsx";
import ClientRequestsPage from "../admindashboard/clientrequestpage.js";
import Adminapartment from "../admindashboard/adminapartment.js";
export default function AppRoutes() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<NewsDetail />} />
    </Routes>
<Routes>
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path ="/admin/news" element={<AdminNewsPage/>}/>
      <Route path="/admin/requests" element={<ClientRequestsPage/>}/>
      <Route path="/admin/apartments" element={<Adminapartment/>}/>
</Routes>
</>
  );
}
