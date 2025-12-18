import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaUserShield, FaStore, FaExclamationTriangle } from "react-icons/fa";
import Loader from "../../../Components/Loader";

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const token = localStorage.getItem("token");
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/users/${id}/role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (_, variables) => {
      toast.success(`User role updated to ${variables.role}`);
      queryClient.invalidateQueries(["adminUsers"]);
    },
  });

  const markFraudMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/vendors/${id}/fraud`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success("Vendor marked as fraud");
      queryClient.invalidateQueries(["adminUsers"]);
    },
  });

  const handleMakeAdmin = async (id, name) => {
    const res = await Swal.fire({
      title: "Make Admin?",
      text: `Make ${name} an administrator?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (res.isConfirmed) {
      updateRoleMutation.mutate({ id, role: "admin" });
    }
  };

  const handleMakeVendor = async (id, name) => {
    const res = await Swal.fire({
      title: "Make Vendor?",
      text: `Make ${name} a vendor?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (res.isConfirmed) {
      updateRoleMutation.mutate({ id, role: "vendor" });
    }
  };

  const handleMarkFraud = async (id, name) => {
    const res = await Swal.fire({
      title: "Mark as Fraud?",
      text: `All tickets from ${name} will be hidden`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Mark Fraud",
    });
    if (res.isConfirmed) {
      markFraudMutation.mutate(id);
    }
  };

  const roleBadge = (role) => {
    if (role === "admin")
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200";
    if (role === "vendor")
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200";
    return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>Manage Users - TicketBari</title>
      </Helmet>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
        Manage Users
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Stat
          title="Users"
          value={users.filter((u) => u.role === "user").length}
          color="bg-blue-500"
        />
        <Stat
          title="Vendors"
          value={users.filter((u) => u.role === "vendor").length}
          color="bg-purple-500"
        />
        <Stat
          title="Admins"
          value={users.filter((u) => u.role === "admin").length}
          color="bg-red-500"
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {["User", "Email", "Role", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-semibold dark:text-gray-300"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={u.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold dark:text-white">
                    {u.name}
                  </span>
                </td>

                <td className="px-4 py-3 dark:text-white">{u.email}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${roleBadge(
                      u.role
                    )}`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {u.isFraud ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-red-100 dark:bg-red-900 text-red-700">
                      Fraud
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-700">
                      Active
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  {u.role !== "admin" && (
                    <div className="flex gap-2 flex-wrap">
                      <ActionBtn
                        color="bg-red-500"
                        icon={<FaUserShield />}
                        text="Admin"
                        onClick={() => handleMakeAdmin(u._id, u.name)}
                      />
                      <ActionBtn
                        color="bg-purple-500"
                        icon={<FaStore />}
                        text="Vendor"
                        onClick={() => handleMakeVendor(u._id, u.name)}
                      />
                      {u.role === "vendor" && !u.isFraud && (
                        <ActionBtn
                          color="bg-orange-500"
                          icon={<FaExclamationTriangle />}
                          text="Fraud"
                          onClick={() => handleMarkFraud(u._id, u.name)}
                        />
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
          >
            <div className="flex gap-3 mb-3">
              <img
                src={u.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"}
                className="w-14 h-14 rounded-full"
              />
              <div className="min-w-0">
                <p className="font-bold dark:text-white truncate">{u.name}</p>
                <p className="text-sm text-gray-500 truncate">{u.email}</p>
              </div>
            </div>

            <div className="flex justify-between mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${roleBadge(
                  u.role
                )}`}
              >
                {u.role}
              </span>
              {u.isFraud ? (
                <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">
                  Fraud
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  Active
                </span>
              )}
            </div>

            {u.role !== "admin" && (
              <div className="flex flex-wrap gap-2">
                <MobileBtn
                  text="Admin"
                  color="bg-red-500"
                  icon={<FaUserShield />}
                  onClick={() => handleMakeAdmin(u._id, u.name)}
                />
                <MobileBtn
                  text="Vendor"
                  color="bg-purple-500"
                  icon={<FaStore />}
                  onClick={() => handleMakeVendor(u._id, u.name)}
                />
                {u.role === "vendor" && !u.isFraud && (
                  <MobileBtn
                    text="Fraud"
                    color="bg-orange-500"
                    icon={<FaExclamationTriangle />}
                    onClick={() => handleMarkFraud(u._id, u.name)}
                    full
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Stat = ({ title, value, color }) => (
  <div className={`${color} text-white rounded-xl p-5`}>
    <p className="text-sm opacity-90">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const ActionBtn = ({ text, icon, onClick, color }) => (
  <button
    onClick={onClick}
    className={`${color} text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1`}
  >
    {icon}
    {text}
  </button>
);

const MobileBtn = ({ text, icon, onClick, color, full }) => (
  <button
    onClick={onClick}
    className={`${color} text-white py-2 rounded-xl text-xs flex items-center justify-center gap-1 ${
      full ? "w-full" : "flex-1"
    }`}
  >
    {icon}
    {text}
  </button>
);

export default ManageUsers;
