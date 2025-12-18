import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Loader from "../../../Components/Loader";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/transactions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>Transaction History - TicketBari</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Transaction History
      </h1>

      {transactions.length === 0 && (
        <p className="text-center py-16 text-gray-500">No transactions found</p>
      )}

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
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                className=" dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="p-4 text-sm dark:text-gray-300">
                  {t.transactionId}
                </td>
                <td className="p-4 font-medium dark:text-white">
                  {t.ticketTitle}
                </td>
                <td className="p-4 font-bold text-[#209FD7]">৳{t.amount}</td>
                <td className="p-4 text-sm dark:text-gray-300">
                  {new Date(t.paymentDate).toLocaleDateString()}
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
                {t.transactionId}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-500">Ticket</p>
              <p className="font-semibold dark:text-white">{t.ticketTitle}</p>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="font-bold text-primary">৳{t.amount}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm dark:text-gray-300">
                  {new Date(t.paymentDate).toLocaleDateString()}
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
