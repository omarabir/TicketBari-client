import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "./TicketCard";
import TicketCardSkeleton from "./TicketCardSkeleton";

const LatestTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/tickets/latest/all`
        );
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching latest tickets:", error);
        console.error("Error details:", error.response?.data);
        // Set empty array so component still renders
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16 ">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Latest Tickets
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Browse our newest ticket offerings for your next adventure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? // Show 8 skeleton cards while loading
            [...Array(8)].map((_, index) => <TicketCardSkeleton key={index} />)
          : tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
      </div>
    </section>
  );
};

export default LatestTickets;
