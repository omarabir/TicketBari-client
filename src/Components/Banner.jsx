import { useState, useEffect, useRef } from "react";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaExchangeAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { gsap } from "gsap";

const Banner = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bus");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const tabs = [
    { id: "bus", label: "Bus", icon: <FaBus /> },
    { id: "train", label: "Train", icon: <FaTrain /> },
    { id: "launch", label: "Launch", icon: <FaShip /> },
    { id: "flight", label: "Flight", icon: <FaPlane /> },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();

    searchParams.append("transportType", activeTab);

    if (from) {
      searchParams.append("from", from);
    }

    if (to) {
      searchParams.append("to", to);
    }

    navigate(`/all-ticket?${searchParams.toString()}`);
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div
      ref={heroRef}
      className="relative mt-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("https://i.ibb.co.com/mpQhHQg/image.png")`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>

      <div className="relative container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div ref={titleRef} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Book Your Journey
          </h1>
          <p className="text-base md:text-lg text-white/90">
            Travel anywhere, anytime with ease
          </p>
        </div>

        <div ref={cardRef} className="max-w-5xl mx-auto">
          <div className="bg-white/95 dark:bg-gray-800 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm md:text-base font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-[#1FA0D6]  bg-primary/5  border-b-3 border-[#1FA0D6] dark:border-[#1FA0D6]"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 "
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    FROM
                  </label>
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Select a city"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#1FA0D6] focus:border-transparent transition-all"
                  />
                </div>

                <div className="hidden lg:flex items-end justify-center pb-3">
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="p-3 rounded-full bg-[#1FA0D6]/20  text-[#1FA0D6] dark:text-[#1FA0D6] hover:bg-[#1FA0D6]/30 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
                  >
                    <FaExchangeAlt className="text-xl" />
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    TO
                  </label>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Select a city"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#1FA0D6] focus:border-transparent transition-all"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    DEPARTURE DATE
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    />
                    <FaCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-2 bg-[#1FA0D6] text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
