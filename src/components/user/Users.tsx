import { getAllUsers } from "../../api/user";

import { useQuery } from "@tanstack/react-query";

import "./User.scss";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <div className="users-container">
      {isLoading ? <Spinner /> : undefined}
      {users?.map((u) => (
        <p key={u.id}>
          <Link to={u.id}>{u.profile.name}</Link>
        </p>
      ))}
    </div>
  );
};

export default Users;
