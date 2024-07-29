import { Navigate, Route, Routes } from "react-router-dom";
import Users from "./user/Users";
import EditUser from "./user/EditUser";
import MainLayout from "./MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user" element={<MainLayout />}>
        <Route path="" element={<Users />}></Route>
        <Route path=":id" element={<EditUser />}></Route>
        <Route path="new" element={<EditUser />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/user" replace={true} />}></Route>
    </Routes>
  );
};

export default AppRoutes;
