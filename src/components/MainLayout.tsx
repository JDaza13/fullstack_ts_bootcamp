import { Icon } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";

import "./MainLayout.scss";

const MainLayout = () => {
  return (
    <main className="main-layout">
      <div className="taskbar-container">
        <Link to={"/user"}>
          <Icon as={MdHome} boxSize={"2rem"} color={"gray"} />
        </Link>
        <Link to={"/user/new"}>
          <Icon as={AiOutlineUserAdd} boxSize={"2rem"} color={"gray"} />
        </Link>
      </div>
      <Outlet />
    </main>
  );
};

export default MainLayout;
