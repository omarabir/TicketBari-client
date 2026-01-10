import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      // Fetch user's bookings
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Show all bookings as transactions (both pending and confirmed)
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Transaction History - TicketBari</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Transaction History
      </h1>

      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="p-4 text-left text-sm font-semibold dark:text-gray-300">
                Transaction ID
              </th>
              <th className="p-4 text-left text-sm font-semibold dark:text-gray-300">
                Ticket Title
              </th>
              <th className="p-4 text-left text-sm font-semibold dark:text-gray-300">
                Amount
              </th>
              <th className="p-4 text-left text-sm font-semibold dark:text-gray-300">
                Payment Date
              </th>
            </tr>
          </thead>
          {transactions.length === 0 && (
            <p className="text-center py-16 text-gray-500 text-center">
              No transactions found
            </p>
          )}
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="p-4 text-sm dark:text-gray-300 font-mono">
                  {t._id.slice(-8)}
                </td>
                <td className="p-4 font-medium dark:text-white">
                  {t.ticketTitle || "N/A"}
                </td>
                <td className="p-4 font-bold text-[#209FD7]">
                  ৳{t.price * t.quantity || t.totalPrice || 0}
                </td>
                <td className="p-4 text-sm dark:text-gray-300">
                  {new Date(t.createdAt || t.bookingDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {transactions.map((t) => (
          <div
            key={t._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
          >
            <div className="mb-2">
              <p className="text-xs text-gray-500">Transaction ID</p>
              <p className="text-sm font-mono break-all dark:text-gray-300">
                {t._id.slice(-8)}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-500">Ticket</p>
              <p className="font-semibold dark:text-white">
                {t.ticketTitle || "N/A"}
              </p>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="font-bold text-[#209FD7]">
                  ৳{t.price * t.quantity || t.totalPrice || 0}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm dark:text-gray-300">
                  {new Date(t.createdAt || t.bookingDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
