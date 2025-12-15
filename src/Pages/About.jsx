import { Helmet } from "react-helmet-async";
import { FaBus, FaUsers, FaAward, FaShieldAlt, FaHeart } from "react-icons/fa";

const About = () => {
  const stats = [
    { icon: <FaUsers />, value: "50K+", label: "Happy Customers" },
    { icon: <FaBus />, value: "200+", label: "Transport Partners" },
    { icon: <FaAward />, value: "5+", label: "Years Experience" },
    { icon: <FaShieldAlt />, value: "100%", label: "Secure Booking" },
  ];

  const features = [
    {
      icon: <FaBus className="text-5xl text-blue-500" />,
      title: "Multiple Transport Options",
      description:
        "Choose from bus, train, launch, and plane tickets - all in one platform.",
    },
    {
      icon: <FaShieldAlt className="text-5xl text-green-500" />,
      title: "Secure Payment",
      description:
        "Your transactions are protected with industry-standard encryption.",
    },
    {
      icon: <FaHeart className="text-5xl text-red-500" />,
      title: "24/7 Support",
      description:
        "Our dedicated team is always ready to assist you with any queries.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <Helmet>
        <title>About Us - TicketBari</title>
      </Helmet>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            About TicketBari
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your trusted travel companion for booking tickets across Bangladesh.
            We make travel easier, faster, and more convenient.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl text-blue-500 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              Founded in 2020, TicketBari started with a simple mission: to make
              travel booking accessible to everyone in Bangladesh. We noticed
              the challenges people faced when booking tickets for different
              modes of transport, and we decided to create a solution.
            </p>
            <p>
              Today, TicketBari has grown to become one of the leading online
              ticket booking platforms in the country. We partner with hundreds
              of transport operators to provide you with the best options for
              your journey.
            </p>
            <p>
              Our platform brings together bus, train, launch, and plane tickets
              in one convenient location. Whether you're traveling for business
              or pleasure, we're here to make your journey smooth from start to
              finish.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[linear-gradient(159deg,#377CBD_0%,#09335B_50%,#09335B_100%)] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="opacity-90">
              To provide a seamless, reliable, and user-friendly platform that
              connects travelers with transport operators, making journey
              planning effortless and enjoyable for everyone.
            </p>
          </div>
          <div className="bg-[linear-gradient(159deg,#ABD5FF_0%,#377CBD_50%,#377CBD_100%)] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="opacity-90">
              To become the most trusted and preferred travel booking platform
              in Bangladesh, revolutionizing the way people plan and book their
              journeys across the country.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
