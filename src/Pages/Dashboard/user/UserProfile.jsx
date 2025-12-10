import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">My Profile</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user?.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"}
            alt={user?.displayName}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              {user?.displayName}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              User
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
