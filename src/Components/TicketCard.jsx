import { Link } from "react-router";
import { FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";

const TicketCard = ({ ticket }) => {
  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus":
        return <FaBus className="text-2xl" />;
      case "train":
        return <FaTrain className="text-2xl" />;
      case "launch":
        return <FaShip className="text-2xl" />;
      case "plane":
        return <FaPlane className="text-2xl" />;
      default:
        return <FaBus className="text-2xl" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.ticketTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {ticket.transportType}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {ticket.ticketTitle}
        </h3>

        {ticket.fromLocation && ticket.toLocation && (
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {ticket.fromLocation} → {ticket.toLocation}
          </p>
        )}

        <div className="flex items-center space-x-2 text-primary mb-3">
          {getTransportIcon(ticket.transportType)}
          <span className="font-semibold">{ticket.transportType}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-primary">৳{ticket.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              per ticket
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Available: {ticket.ticketQuantity}
            </p>
          </div>
        </div>

        {ticket.perks && ticket.perks.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {ticket.perks.slice(0, 3).map((perk, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          to={`/ticket/${ticket._id}`}
          className="block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
