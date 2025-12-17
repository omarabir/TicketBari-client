import { FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router";

const PopularRoutes = () => {
  const routes = [
    { icon: FaBus, from: "Dhaka", to: "Chittagong", transport: "bus" },
    { icon: FaShip, from: "Dhaka", to: "Barisal", transport: "launch" },
    { icon: FaPlane, from: "Dhaka", to: "Sydney", transport: "plane" },
    { icon: FaTrain, from: "Chittagong", to: "Dhaka", transport: "train" },
  ];

  const toTransportTypeParam = (transport) => {
    switch ((transport || "").toLowerCase()) {
      case "bus":
        return "Bus";
      case "train":
        return "Train";
      case "launch":
        return "Launch";
      case "flight":
      case "plane":
        return "Plane";
      default:
        return "";
    }
  };

  const toTransportIcon = (transport) => {
    switch ((transport || "").toLowerCase()) {
      case "bus":
        return FaBus;
      case "train":
        return FaTrain;
      case "launch":
        return FaShip;
      case "flight":
      case "plane":
        return FaPlane;
      default:
        return FaBus;
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Popular Routes
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Quick access to frequently booked destinations
            </p>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Tap a route to filter tickets
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {routes.map((route, index) => {
            const Icon = toTransportIcon(route.transport);

            const params = new URLSearchParams();
            params.set("from", route.from);
            params.set("to", route.to);
            const transportType = toTransportTypeParam(route.transport);
            if (transportType) params.set("transportType", transportType);

            return (
              <Link
                key={index}
                to={`/all-ticket?${params.toString()}`}
                aria-label={`View ${transportType || ""} tickets from ${
                  route.from
                } to ${route.to}`}
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-[#1FA0D6]">
                      <Icon className="text-xl" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold flex items-center text-gray-900 dark:text-white">
                        {route.from} <IoIosArrowRoundForward /> {route.to}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        {transportType || "Transport"}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 px-2 py-0.5 text-[11px] text-gray-600 dark:text-gray-300 group-hover:border-[#1FA0D6]/40 group-hover:text-[#1FA0D6] transition">
                    View
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs flex items-center text-gray-500 dark:text-gray-400">
                    {route.from} <IoIosArrowRoundForward /> {route.to}
                  </div>
                  <div className="text-xs font-medium text-[#1FA0D6] flex items-center">
                    Explore <MdArrowOutward />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
