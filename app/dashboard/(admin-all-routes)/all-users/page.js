import UsersTable from "@/components/Dashboard/Admin/AllUsers/AllUsersTable/UsersTable";
import React from "react";

const AllUsers = () => {
  return (
    <div className="p-6">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 ">
        All Users Management Here For Admin
      </h2>

      <UsersTable />
    </div>
  );
};

export default AllUsers;
