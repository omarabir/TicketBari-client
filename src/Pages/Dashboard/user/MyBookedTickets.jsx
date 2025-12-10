import { useEffect, useState, useContext } from "react";
import axios from "axios";

import Countdown from "react-countdown";

import toast from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";

const MyBookedTickets = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (booking) => {
    toast.success("Payment feature - Integrate Stripe here");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        My Booked Tickets
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <img
              src={booking.ticketDetails.image}
              alt={booking.ticketTitle}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              {booking.ticketTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {booking.ticketDetails.fromLocation} →{" "}
              {booking.ticketDetails.toLocation}
            </p>
            <p className="text-lg font-semibold text-primary mb-2">
              Quantity: {booking.bookingQuantity} | Total: ৳{booking.totalPrice}
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(
                booking.status
              )}`}
            >
              {booking.status}
            </span>

            {booking.status === "accepted" &&
              new Date(booking.ticketDetails.departureDateTime) >
                new Date() && (
                <button
                  onClick={() => handlePayment(booking)}
                  className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Pay Now
                </button>
              )}

            {booking.status !== "rejected" && (
              <div className="mt-4">
                <Countdown
                  date={new Date(booking.ticketDetails.departureDateTime)}
                  renderer={({ days, hours, minutes }) => (
                    <div className="text-center text-sm">
                      {days}d {hours}h {minutes}m
                    </div>
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookedTickets;
