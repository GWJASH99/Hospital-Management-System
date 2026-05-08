import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import UserLayout from "../layout/UserLayout";
import PHome from "../pages/PHome";
import Sessions from "../pages/Sessions";
import Dashboard from "../pages/Dashboard";
import Doctor from "../pages/Doctor";
import Setting from "../pages/Setting";
import DoctorLayout from "../layout/DoctorLayout";
import AdminLayout from "../layout/AdminLayout";
import Appointment from "../pages/Appointment";
import UserSessions from "../pages/UserSessions";
import UserAppointment from "../pages/UserAppointment";
import Patients from "../pages/Patients";
import { aboutMe } from "../services/auth";
import UserDoctor from "../pages/UserDoctor";
import AdminAppointment from "../pages/AdminAppointment";
import DoctorSession from "../pages/DoctorSession";
import Test from "../components/test";
import DoctorPharmesy from "../pages/DoctorPharmesy";
import UserPharmesy from "../pages/UserPharmesy";
import AdminPharmesy from "../pages/AdminPharmesy";
import PharmesyLayout from "../layout/PharmesyLayout";
import CompletedOrders from "../pages/Completed";
import Pending from "../pages/Pending";
import Orders from "../pages/Orders";
import Analytics from "../pages/Analytics";

let id = localStorage.getItem("id") || null;
if (id) {
  id = JSON.parse(id);
}
let user = await aboutMe(id);
const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/signup", element: <SignupForm /> },
  { path: "/test", element: <Test /> },
];

if (user?.role === "user") {
  routes.push({
    path: "/home",
    element: <UserLayout />,
    children: [
      { index: true, path: "main", element: <PHome /> },
      { path: "sessions", element: <UserSessions /> },
      { path: "appointment", element: <UserAppointment /> },
      { path: "doctors", element: <UserDoctor /> },
      { path: "pharmesy", element: <UserPharmesy /> },
      { path: "setting", element: <Setting /> },
    ],
  });
} else if (user?.role === "doctor") {
  routes.push({
    path: "/home",
    element: <DoctorLayout />,
    children: [
      { index: true, path: "main", element: <Dashboard /> },
      { path: "sessions", element: <DoctorSession /> },
      { path: "appointment", element: <Appointment /> },
      { path: "pharmesy", element: <DoctorPharmesy /> },
      { path: "setting", element: <Setting /> },
      { path: "analytics", element: <Analytics /> },
    ],
  });
} else if (user?.role === "admin") {
  routes.push({
    path: "/home",
    element: <AdminLayout />,
    children: [
      { index: true, path: "main", element: <Dashboard /> },
      { path: "doctor", element: <Doctor /> },
      { path: "sessions", element: <Sessions /> },
      { path: "appointment", element: <AdminAppointment /> },
      { path: "pharmesy", element: <AdminPharmesy /> },
      { path: "patients", element: <Patients /> },
      { path: "analytics", element: <Analytics /> },
    ],
  });
} else if (user?.role === "pharmacists") {
  routes.push({
    path: "/home",
    element: <PharmesyLayout />,
    children: [
      { index: true, path: "main", element: <Dashboard /> },
      { path: "orders", element: <Orders/> },
      { path: "Completed", element: <CompletedOrders/> },
      { path: "pending", element: <Pending /> },
      { path: "setting", element: <Setting /> },
    ],
  });
} else {
  routes.push({ path: "/home", element: <LoginForm /> });
}

const router = createBrowserRouter(routes);
user = null;
export default router;
