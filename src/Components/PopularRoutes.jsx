import { FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";
import { Link } from "react-router";

const PopularRoutes = () => {
  const routes = [
    { icon: FaBus, from: "Dhaka", to: "Chittagong", transport: "bus" },
    { icon: FaShip, from: "Dhaka", to: "Barisal", transport: "launch" },
    { icon: FaPlane, from: "Dhaka", to: "Cox's Bazar", transport: "flight" },
    { icon: FaTrain, from: "Chittagong", to: "Sylhet", transport: "train" },
  ];

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold  mb-2">
            Popular Routes
          </h2>
          <p className=" text-sm">
            Quick access to frequently booked destinations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4  gap-3 ">
          {routes.map((route, index) => {
            const Icon = route.icon;
            return (
              <Link
                key={index}
                to={`/all-ticket?search=${route.from} ${route.to}&transportType=${route.transport}`}
                className="flex flex-col items-center p-4 bg-gray-50 dark:bg-[#09335B] rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-md transition-all"
              >
                <Icon className="text-3xl text-[#1FA0D6]  mb-2" />
                <p className="text-xs font-semibold text-gray-900 dark:text-white text-center mb-1">
                  {route.from}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  ↓
                </p>
                <p className="text-xs font-semibold text-gray-900 dark:text-white text-center">
                  {route.to}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
