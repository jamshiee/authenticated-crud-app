import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import useStore from "../store/useStore.js";
import EditUser from "./EditUser.jsx";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState("");

  const { dataChange } = useStore((state) => state);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user/getuser");
      setUserList(res.data.list);
      setFilteredUsers(res.data.list);
    } catch (error) {
      console.log("Error While Fetching: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [dataChange]);

  useEffect(() => {
    let filtered = userList;

    if (search) {
      filtered = filtered.filter(
        (user) =>
          user.username?.toLowerCase().includes(search.toLowerCase()) ||
          user.firstname?.toLowerCase().includes(search.toLowerCase()) ||
          user.lastname?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter(
        (user) => user.department === selectedDepartment
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((user) => user.userrole === selectedRole);
    }

    if (selectedStatus !== "") {
      filtered = filtered.filter(
        (user) => user.isActive === (selectedStatus === "true")
      );
    }

    setFilteredUsers(filtered);
  }, [search, selectedDepartment, selectedRole, selectedStatus, userList]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div>
      <div className="border border-sky-400 rounded shadow bg-white mt-6">
        <div className="bg-sky-400 text-white text-lg font-semibold px-4 py-3 flex justify-between items-center">
          <div className="text-white text-2xl font-bold">User List</div>
          <div className="flex">
            <div className="gap-3 flex text-md px-2">
              <p className="text-gray-700">
                Total Users: <span>{userList.length}</span>
              </p>
              <p className="text-green-300">
                Active:
                <span>{userList.filter((user) => user.isActive).length}</span>
              </p>
              <p className="text-red-500">
                Inactive:
                <span>{userList.filter((user) => !user.isActive).length}</span>
              </p>
            </div>
            <div>
              <button className="bg-blue-700 px-4 py-1 rounded text-white">
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="p-1 text-sm flex gap-2 items-center justify-between mb-2">
          <div className="flex gap-2">
            <p>Show</p>
            <select className="border px-1 py-0">
              <option>100</option>
            </select>
            <p>entries</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="border px-2 py-1 rounded"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">SELECT DEPARTMENT</option>
              <option>Cardio Department</option>
              <option>Neurology Department</option>
              <option>Ent Department</option>
              <option>Physio Department</option>
            </select>
            <select
              className="border px-2 py-1 rounded"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">SELECT ROLE</option>
              <option>Specialist</option>
              <option>Analyst</option>
              <option>Operator</option>
            </select>
            <select
              className="border px-2 py-1 rounded"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">SELECT STATUS</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <label>Search: </label>
            <input
              type="text"
              placeholder="Search by name..."
              className="border px-2 py-1 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-400 px-2 py-2 text-left">
                  Sl. No
                </th>
                <th className="border border-gray-400 px-2 py-2 text-left">
                  User Name
                </th>
                <th className="border border-gray-400 px-2 py-2 text-left">
                  First Name
                </th>
                <th className="border border-gray-400 px-2 py-2 text-left">
                  Last Name
                </th>
                <th className="border border-gray-400 px-2 py-2 text-left">
                  Department
                </th>
                <th className="border border-gray-400 px-2 py-2 text-left">
                  Role
                </th>
                <th className="border border-gray-400 px-2 py-2 text-left">
                  Created Date
                </th>
                <th className="border border-gray-400 px-2 py-2 text-left">
                  Status
                </th>
                <th className="border border-gray-400 px-2 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user._id || index}>
                    <td className="border border-gray-400 px-2 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-2 py-2">
                      {user.username}
                    </td>
                    <td className="border border-gray-400 px-2 py-2">
                      {user.firstname}
                    </td>
                    <td className="border border-gray-400 px-2 py-2">
                      {user.lastname}
                    </td>
                    <td className="border border-gray-400 px-2 py-2">
                      {user.department}
                    </td>
                    <td className="border border-gray-400 px-2 py-2">
                      {user.userrole}
                    </td>
                    <td className="border border-gray-400 px-2 py-2 ">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="border border-gray-400 px-2 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          user.isActive
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="border border-gray-400 px-2 py-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        onClick={() => {
                          setModalOpen(true);
                          setUser(user);

                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="border px-2 py-2 text-center">
                    No users found
                  </td>
                </tr>
              )}

           
            </tbody>
          </table>
          <EditUser
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                user={user}
              />
        </div>

        <div className="p-4 flex justify-end gap-2 text-sm">
          <button className="px-2 py-1 border rounded">First</button>
          <button className="px-2 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 border rounded bg-blue-100">1</button>
          <button className="px-2 py-1 border rounded">Next</button>
          <button className="px-2 py-1 border rounded">Last</button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
