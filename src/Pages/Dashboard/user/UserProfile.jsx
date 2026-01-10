import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Providers/AuthProvider";
import {
  FaEnvelope,
  FaUser,
  FaIdBadge,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });
  const [saving, setSaving] = useState(false);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleEdit = () => {
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { updateProfile } = await import("firebase/auth");
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      window.location.reload(); // Refresh to show updated info
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>My Profile - TicketBari</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        My Profile
      </h1>

      <div className="flex justify-end mb-4">
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave /> Save Changes
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[linear-gradient(159deg,#377CBD_0%,#09335B_50%,#09335B_100%)] h-32"></div>

        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-6">
            <img
              src={
                isEditing
                  ? formData.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"
                  : user?.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"
              }
              alt={user?.displayName}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
            />
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="text-3xl font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg w-full md:w-auto"
                  placeholder="Your name"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {user?.displayName}
                </h2>
              )}
              <span className="inline-block mt-2 px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                User Account
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <FaUser className="text-2xl text-[#1FA0D6]" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Full Name
                </h3>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="text-gray-600 dark:text-gray-300 ml-9 bg-white dark:bg-gray-600 px-3 py-2 rounded-lg w-full"
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300 ml-9">
                  {user?.displayName}
                </p>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <FaEnvelope className="text-2xl text-[#1FA0D6]" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Email Address
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 ml-9">
                {user?.email}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <FaIdBadge className="text-2xl text-[#1FA0D6]" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Account Type
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 ml-9">
                {userData?.role || "User"}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <FaIdBadge className="text-2xl text-[#1FA0D6]" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Photo URL
                </h3>
              </div>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.photoURL}
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                  className="text-gray-600 dark:text-gray-300 ml-9 bg-white dark:bg-gray-600 px-3 py-2 rounded-lg w-full"
                  placeholder="Enter photo URL"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300 ml-9 truncate">
                  {user?.photoURL || "Not set"}
                </p>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <FaIdBadge className="text-2xl text-[#1FA0D6]" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Account Status
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 ml-9">
                <span className="text-green-500 font-semibold">Active</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
