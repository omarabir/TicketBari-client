import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaUserShield, FaStore, FaExclamationTriangle } from 'react-icons/fa';

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/users/${id}/role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success(`User role updated to ${variables.role}!`);
      queryClient.invalidateQueries(['adminUsers']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update role');
    },
  });

  const markFraudMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/vendors/${id}/fraud`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Vendor marked as fraud successfully!');
      queryClient.invalidateQueries(['adminUsers']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to mark as fraud');
    },
  });

  const handleMakeAdmin = async (id, name) => {
    const result = await Swal.fire({
      title: 'Make Admin?',
      text: `Make ${name} an administrator?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, make admin',
    });

    if (result.isConfirmed) {
      updateRoleMutation.mutate({ id, role: 'admin' });
    }
  };

  const handleMakeVendor = async (id, name) => {
    const result = await Swal.fire({
      title: 'Make Vendor?',
      text: `Make ${name} a vendor?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8B5CF6',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, make vendor',
    });

    if (result.isConfirmed) {
      updateRoleMutation.mutate({ id, role: 'vendor' });
    }
  };

  const handleMarkFraud = async (id, name) => {
    const result = await Swal.fire({
      title: 'Mark as Fraud?',
      text: `This will hide all tickets from ${name} and prevent them from adding new ones.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, mark as fraud',
      dangerMode: true,
    });

    if (result.isConfirmed) {
      markFraudMutation.mutate(id);
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'vendor':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Manage Users - TicketBari</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Manage Users
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6">
          <p className="text-sm opacity-90 mb-2">Total Users</p>
          <p className="text-4xl font-bold">
            {users.filter((u) => u.role === 'user').length}
          </p>
        </div>
        <div className="bg-purple-500 text-white rounded-xl shadow-lg p-6">
          <p className="text-sm opacity-90 mb-2">Total Vendors</p>
          <p className="text-4xl font-bold">
            {users.filter((u) => u.role === 'vendor').length}
          </p>
        </div>
        <div className="bg-red-500 text-white rounded-xl shadow-lg p-6">
          <p className="text-sm opacity-90 mb-2">Total Admins</p>
          <p className="text-4xl font-bold">
            {users.filter((u) => u.role === 'admin').length}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left dark:text-gray-300">User</th>
                <th className="p-4 text-left dark:text-gray-300">Email</th>
                <th className="p-4 text-left dark:text-gray-300">Role</th>
                <th className="p-4 text-left dark:text-gray-300">Status</th>
                <th className="p-4 text-center dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.photoURL || 'https://i.ibb.co/2Pz4LgR/user.png'}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <p className="font-semibold dark:text-white">{user.name}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="dark:text-white">{user.email}</p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.isFraud ? (
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-semibold">
                        Fraud
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {user.role !== 'admin' && (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleMakeAdmin(user._id, user.name)}
                          disabled={updateRoleMutation.isPending}
                          className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 text-sm"
                        >
                          <FaUserShield />
                          <span>Make Admin</span>
                        </button>
                        <button
                          onClick={() => handleMakeVendor(user._id, user.name)}
                          disabled={updateRoleMutation.isPending}
                          className="flex items-center space-x-1 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition disabled:opacity-50 text-sm"
                        >
                          <FaStore />
                          <span>Make Vendor</span>
                        </button>
                        {user.role === 'vendor' && !user.isFraud && (
                          <button
                            onClick={() => handleMarkFraud(user._id, user.name)}
                            disabled={markFraudMutation.isPending}
                            className="flex items-center space-x-1 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-50 text-sm"
                          >
                            <FaExclamationTriangle />
                            <span>Mark Fraud</span>
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;