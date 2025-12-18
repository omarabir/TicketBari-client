import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Loader from "../../../Components/Loader";

const RequestedBookings = () => {
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["vendorBookings"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/vendor/bookings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const token = localStorage.getItem("token");
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/vendor/bookings/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (_, vars) => {
      toast.success(
        `Booking ${
          vars.status === "accepted" ? "accepted" : "rejected"
        } successfully!`
      );
      queryClient.invalidateQueries(["vendorBookings"]);
    },
  });

  const handleAccept = (id) => {
    updateStatusMutation.mutate({ id, status: "accepted" });
  };

  const handleReject = (id) => {
    updateStatusMutation.mutate({ id, status: "rejected" });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>Booking Requests - TicketBari</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Requested Bookings
      </h1>

      {bookings.length === 0 && (
        <p className="text-center py-16 text-gray-500">
          No booking requests yet
        </p>
      )}

      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {[
                "User",
                "Ticket",
                "Quantity",
                "Total Price",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="p-4 text-left text-sm font-semibold dark:text-gray-300"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr
                key={b._id}
                className=" dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="p-4">
                  <p className="font-semibold dark:text-white">{b.userName}</p>
                  <p className="text-xs text-gray-500">{b.userId}</p>
                </td>

                <td className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={b.ticketDetails.image}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold dark:text-white">
                        {b.ticketTitle}
                      </p>
                      <p className="text-sm text-gray-500">
                        {b.ticketDetails.fromLocation} →{" "}
                        {b.ticketDetails.toLocation}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4 font-semibold dark:text-white">
                  {b.bookingQuantity}
                </td>

                <td className="p-4 font-bold text-primary">৳{b.totalPrice}</td>

                <td className="p-4">
                  <StatusBadge status={b.status} />
                </td>

                <td className="p-4">
                  {b.status === "pending" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAccept(b._id)}
                        className="btn btn-success btn-sm text-white"
                      >
                        <FaCheckCircle /> Accept
                      </button>
                      <button
                        onClick={() => handleReject(b._id)}
                        className="btn btn-error btn-sm text-white"
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </div>
                  ) : (
                    <p className="text-center text-sm text-gray-500">
                      Processed
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
          >
            <div className="flex gap-3 mb-3">
              <img
                src={b.ticketDetails.image}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="font-bold dark:text-white truncate">
                  {b.ticketTitle}
                </p>
                <p className="text-sm text-gray-500">
                  {b.ticketDetails.fromLocation} → {b.ticketDetails.toLocation}
                </p>
                <p className="text-sm font-semibold text-primary">
                  ৳{b.totalPrice}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-xs text-gray-500">User</p>
                <p className="font-semibold dark:text-white">{b.userName}</p>
              </div>

              <StatusBadge status={b.status} />
            </div>

            {b.status === "pending" ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(b._id)}
                  className="flex-1 flex justify-center items-center gap-2 py-2 bg-green-500 text-white rounded-lg"
                >
                  <FaCheckCircle /> Accept
                </button>
                <button
                  onClick={() => handleReject(b._id)}
                  className="flex-1 flex justify-center items-center gap-2 py-2 bg-red-500 text-white rounded-lg"
                >
                  <FaTimesCircle /> Reject
                </button>
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                Already processed
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ===== helpers ===== */
const StatusBadge = ({ status }) => {
  const map = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    accepted:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}
    >
      {status}
    </span>
  );
};

export default RequestedBookings;
