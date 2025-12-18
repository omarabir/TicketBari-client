import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import { useState } from "react";
import Loader from "../../../Components/Loader";

const ManageTickets = () => {
  const queryClient = useQueryClient();
  const [viewTicket, setViewTicket] = useState(null);

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["adminTickets"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/tickets`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
  });

  const verifyMutation = useMutation({
    mutationFn: async ({ id, verificationStatus }) => {
      const token = localStorage.getItem("token");
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/tickets/${id}/verify`,
        { verificationStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (_, variables) => {
      toast.success(
        `Ticket ${
          variables.verificationStatus === "approved" ? "approved" : "rejected"
        }`
      );
      queryClient.invalidateQueries(["adminTickets"]);
    },
  });

  const badge = (status) => {
    if (status === "approved")
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200";
    if (status === "rejected")
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200";
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200";
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>Manage Tickets - TicketBari</title>
      </Helmet>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
        Manage Tickets
      </h1>

      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {[
                "Ticket",
                "Vendor",
                "Route",
                "Price",
                "Qty",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-semibold dark:text-gray-300 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr
                key={t._id}
                className=" dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <img
                      src={t.image}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold dark:text-white">
                        {t.ticketTitle}
                      </p>
                      <p className="text-sm text-gray-500">{t.transportType}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <p className="font-medium dark:text-white">{t.vendorName}</p>
                  <p className="text-sm text-gray-500">{t.vendorEmail}</p>
                </td>

                <td className="px-4 py-3 dark:text-white whitespace-nowrap">
                  {t.fromLocation} → {t.toLocation}
                </td>

                <td className="px-4 py-3 font-bold text-primary">৳{t.price}</td>
                <td className="px-4 py-3 dark:text-white">
                  {t.ticketQuantity}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(
                      t.verificationStatus
                    )}`}
                  >
                    {t.verificationStatus}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewTicket(t)}
                      className="btn btn-sm btn-info"
                    >
                      <FaEye color="white" />
                    </button>
                    {t.verificationStatus === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            verifyMutation.mutate({
                              id: t._id,
                              verificationStatus: "approved",
                            })
                          }
                          className="btn btn-sm btn-success"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() =>
                            verifyMutation.mutate({
                              id: t._id,
                              verificationStatus: "rejected",
                            })
                          }
                          className="btn btn-sm btn-error"
                        >
                          <FaTimesCircle />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {tickets.map((t) => (
          <div
            key={t._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4"
          >
            <div className="flex gap-3 mb-3">
              <img
                src={t.image}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-bold dark:text-white">{t.ticketTitle}</h3>
                <p className="text-sm text-gray-500">
                  {t.fromLocation} → {t.toLocation}
                </p>
              </div>
            </div>

            <div className="text-sm space-y-1 mb-3 dark:text-gray-300">
              <p>
                <b>Vendor:</b> {t.vendorName}
              </p>
              <p>
                <b>Price:</b> ৳{t.price}
              </p>
              <p>
                <b>Quantity:</b> {t.ticketQuantity}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(
                  t.verificationStatus
                )}`}
              >
                {t.verificationStatus}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewTicket(t)}
                  className="btn btn-xs btn-info"
                >
                  <FaEye />
                </button>
                {t.verificationStatus === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        verifyMutation.mutate({
                          id: t._id,
                          verificationStatus: "approved",
                        })
                      }
                      className="btn btn-xs btn-success"
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      onClick={() =>
                        verifyMutation.mutate({
                          id: t._id,
                          verificationStatus: "rejected",
                        })
                      }
                      className="btn btn-xs btn-error"
                    >
                      <FaTimesCircle />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Ticket Details
              </h3>
              <button
                onClick={() => setViewTicket(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <img
              src={viewTicket.image}
              alt={viewTicket.ticketTitle}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Title
                  </p>
                  <p className="font-semibold dark:text-white">
                    {viewTicket.ticketTitle}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Transport Type
                  </p>
                  <p className="font-semibold dark:text-white">
                    {viewTicket.transportType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    From
                  </p>
                  <p className="font-semibold dark:text-white">
                    {viewTicket.fromLocation}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                  <p className="font-semibold dark:text-white">
                    {viewTicket.toLocation}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Price
                  </p>
                  <p className="font-bold text-[#209FD7] text-xl">
                    ৳{viewTicket.price}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quantity
                  </p>
                  <p className="font-semibold dark:text-white">
                    {viewTicket.ticketQuantity}
                  </p>
                </div>
              </div>

              {viewTicket.perks && viewTicket.perks.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Perks
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {viewTicket.perks.map((perk, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTickets;
