import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Countdown from "react-countdown";

import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import toast from "react-hot-toast";

const TicketDetails = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tickets/${id}`
      );
      setTicket(response.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      toast.error("Failed to load ticket details");
    } finally {
      setLoading(false);
    }
  };

  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus":
        return <FaBus className="text-4xl text-primary" />;
      case "train":
        return <FaTrain className="text-4xl text-primary" />;
      case "launch":
        return <FaShip className="text-4xl text-primary" />;
      case "plane":
        return <FaPlane className="text-4xl text-primary" />;
      default:
        return <FaBus className="text-4xl text-primary" />;
    }
  };

  const isDepartureTimePassed = () => {
    return new Date(ticket.departureDateTime) < new Date();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Ticket not found
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 my-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.ticketTitle}
          className="w-full h-96 object-cover"
        />

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {ticket.ticketTitle}
            </h1>
            {getTransportIcon(ticket.transportType)}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-primary text-xl" />
                <span className="text-lg">
                  {ticket.fromLocation} → {ticket.toLocation}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <FaClock className="text-primary text-xl" />
                <span className="text-lg">
                  {new Date(ticket.departureDateTime).toLocaleString()}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Price per ticket
                </p>
                <p className="text-4xl font-bold text-primary">
                  ৳{ticket.price}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Available Seats
                </p>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {ticket.ticketQuantity}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Perks Included
                </p>
                <div className="flex flex-wrap gap-2">
                  {ticket.perks?.map((perk, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Vendor Information
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {ticket.vendorName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {ticket.vendorEmail}
                </p>
              </div>
            </div>
          </div>

          {!isDepartureTimePassed() && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl mb-6">
              <p className="text-center text-lg mb-2">Time until departure:</p>
              <Countdown
                date={new Date(ticket.departureDateTime)}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div className="flex justify-center space-x-4 text-center">
                    <div>
                      <p className="text-4xl font-bold">{days}</p>
                      <p className="text-sm">Days</p>
                    </div>
                    <div className="text-4xl">:</div>
                    <div>
                      <p className="text-4xl font-bold">{hours}</p>
                      <p className="text-sm">Hours</p>
                    </div>
                    <div className="text-4xl">:</div>
                    <div>
                      <p className="text-4xl font-bold">{minutes}</p>
                      <p className="text-sm">Minutes</p>
                    </div>
                    <div className="text-4xl">:</div>
                    <div>
                      <p className="text-4xl font-bold">{seconds}</p>
                      <p className="text-sm">Seconds</p>
                    </div>
                  </div>
                )}
              />
            </div>
          )}

          {/* Book Now Button */}
          <button
            onClick={() => setShowModal(true)}
            disabled={isDepartureTimePassed() || ticket.ticketQuantity === 0}
            className="w-full bg-primary text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDepartureTimePassed()
              ? "Departure Time Passed"
              : ticket.ticketQuantity === 0
              ? "Sold Out"
              : "Book Now"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Complete Your Booking
            </h3>
            <form>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Tickets
                </label>
                <input
                  type="number"
                  min="1"
                  max={ticket.ticketQuantity}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    Price per ticket:
                  </span>
                  <span className="font-semibold">৳{ticket.price}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Total Amount:</span>
                  <span>৳{ticket.price}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                  submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
