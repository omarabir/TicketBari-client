import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "./TicketCard";

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
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16  rounded-lg shadow-md">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold  mb-4">Latest Tickets</h2>
        <p className=" max-w-2xl mx-auto">
          Browse our newest ticket offerings for your next adventure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </section>
  );
};

export default LatestTickets;
