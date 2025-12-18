import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBullhorn, FaEyeSlash } from "react-icons/fa";
import Loader from "../../../Components/Loader";

const AdvertiseTickets = () => {
  const queryClient = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["adminApprovedTickets"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/tickets`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.filter((t) => t.verificationStatus === "approved");
    },
  });

  const toggleAdvertiseMutation = useMutation({
    mutationFn: async ({ id, isAdvertised }) => {
      const token = localStorage.getItem("token");
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/tickets/${id}/advertise`,
        { isAdvertised },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (_, vars) => {
      toast.success(
        vars.isAdvertised
          ? "Ticket advertised successfully!"
          : "Advertisement removed!"
      );
      queryClient.invalidateQueries(["adminApprovedTickets"]);
    },
  });

  const handleToggleAdvertise = (id, current) => {
    const advertisedCount = tickets.filter((t) => t.isAdvertised).length;
    if (!current && advertisedCount >= 6) {
      toast.error("Maximum 6 tickets can be advertised at a time");
      return;
    }
    toggleAdvertiseMutation.mutate({
      id,
      isAdvertised: !current,
    });
  };

  const advertisedTickets = tickets.filter((t) => t.isAdvertised);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>Advertise Tickets - TicketBari</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Advertise Tickets
      </h1>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Stat
          title="Currently Advertised"
          value={`${advertisedTickets.length} / 6`}
          color="from-blue-500 to-blue-600"
        />
        <Stat
          title="Approved Tickets"
          value={tickets.length}
          color="from-purple-500 to-purple-600"
        />
        <Stat
          title="Available Slots"
          value={6 - advertisedTickets.length}
          color="from-green-500 to-green-600"
        />
      </div>

      {/* ===== FEATURED ===== */}
      {advertisedTickets.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Currently Advertised Tickets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisedTickets.map((t) => (
              <div
                key={t._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-green-500 overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img src={t.image} className="h-48 w-full object-cover" />
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <FaBullhorn /> Featured
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg dark:text-white mb-1">
                    {t.ticketTitle}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {t.fromLocation} → {t.toLocation}
                  </p>

                  <button
                    onClick={() => handleToggleAdvertise(t._id, t.isAdvertised)}
                    className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex justify-center items-center gap-2"
                  >
                    <FaEyeSlash />
                    Remove Advertisement
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {["Ticket", "Vendor", "Route", "Price", "Status", "Action"].map(
                (h) => (
                  <th
                    key={h}
                    className="p-4 text-left text-sm font-semibold dark:text-gray-300"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr
                key={t._id}
                className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                  t.isAdvertised ? "bg-green-50 dark:bg-green-900/20" : ""
                }`}
              >
                <td className="p-4 flex gap-3">
                  <img
                    src={t.image}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold dark:text-white">
                      {t.ticketTitle}
                    </p>
                    <p className="text-sm text-gray-500">{t.transportType}</p>
                  </div>
                </td>

                <td className="p-4 dark:text-white">{t.vendorName}</td>

                <td className="p-4 dark:text-white">
                  {t.fromLocation} → {t.toLocation}
                </td>

                <td className="p-4 font-bold text-primary">৳{t.price}</td>

                <td className="p-4">
                  {t.isAdvertised ? (
                    <span className="badge badge-success gap-1">
                      <FaBullhorn /> Advertised
                    </span>
                  ) : (
                    <span className="text-red-300">Not Advertised</span>
                  )}
                </td>

                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={t.isAdvertised}
                    onChange={() =>
                      handleToggleAdvertise(t._id, t.isAdvertised)
                    }
                    disabled={!t.isAdvertised && advertisedTickets.length >= 6}
                    className="toggle toggle-primary"
                  />
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
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
          >
            <div className="flex gap-3 mb-3">
              <img
                src={t.image}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="font-bold dark:text-white truncate">
                  {t.ticketTitle}
                </p>
                <p className="text-sm text-gray-500">
                  {t.fromLocation} → {t.toLocation}
                </p>
                <p className="text-sm font-semibold text-primary">৳{t.price}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              {t.isAdvertised ? (
                <span className="badge badge-success gap-1">
                  <FaBullhorn /> Advertised
                </span>
              ) : (
                <span className="badge">Not Advertised</span>
              )}

              <input
                type="checkbox"
                checked={t.isAdvertised}
                onChange={() => handleToggleAdvertise(t._id, t.isAdvertised)}
                disabled={!t.isAdvertised && advertisedTickets.length >= 6}
                className="toggle toggle-primary"
              />
            </div>
          </div>
        ))}
      </div>

      {tickets.length === 0 && (
        <p className="text-center py-16 text-gray-500">
          No approved tickets available
        </p>
      )}
    </div>
  );
};

const Stat = ({ title, value, color }) => (
  <div
    className={`bg-gradient-to-br ${color} text-white rounded-xl shadow p-6`}
  >
    <p className="text-sm opacity-90 mb-2">{title}</p>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

export default AdvertiseTickets;
