
import AdminComponent from "./Components/Admin/admin";
import LoginPage from "./Components/Login/SignUp/LoginPage";
import SignupPage from "./Components/Login/SignUp/SignupPage";
import Tester from "./Components/Testers/TestsTable"
import SuperAdmin from "./Components/SuperAdmin/SuperAdmin" ;
// export const routes = [
//   { path: "/tester", element: <Tester/> },
//   { path: "/admin", element: <AdminComponent /> },
//   { path: "/signin", element: <LoginPage /> },
//   { path: "/signup", element: <SignupPage /> },
//   { path: "/superAdmin", element: <SuperAdmin /> },
  
// ];

export const routes = [
    { path: "/tester", element: <Tester />, allowedRoles: ["tester"] },
    { path: "/admin", element: <AdminComponent />, allowedRoles: ["admin"] },
    { path: "*", element: <LoginPage />},
    { path: "/signup", element: <SignupPage /> },
    { path: "/superAdmin", element: <SuperAdmin />, allowedRoles: ["superAdmin"] },
  ];
  