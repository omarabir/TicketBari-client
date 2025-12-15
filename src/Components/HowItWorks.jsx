import { useEffect, useRef } from "react";
import { FaSearch, FaTicketAlt, FaCreditCard, FaBus } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const steps = [
    {
      icon: FaSearch,
      title: "Search",
      description: "Find your desired route and travel date",
      color: "blue",
    },
    {
      icon: FaTicketAlt,
      title: "Select",
      description: "Choose your preferred ticket and seat",
      color: "purple",
    },
    {
      icon: FaCreditCard,
      title: "Pay",
      description: "Complete secure payment online",
      color: "green",
    },
    {
      icon: FaBus,
      title: "Travel",
      description: "Board your transport and enjoy the journey",
      color: "orange",
    },
  ];

  const colorClasses = {
    blue: "bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-secondary",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    orange:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  };

  return (
    <section ref={sectionRef} className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold  mb-3">How It Works</h2>
          <p className=" max-w-2xl mx-auto">
            Book your tickets in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className="text-center relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-300 dark:bg-gray-600 -z-10"></div>
                )}

                {/* Step Circle */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-24 h-24 rounded-full ${
                      colorClasses[step.color]
                    } flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="text-4xl" />
                  </div>
                </div>

                <div className="inline-block px-3 py-1 bg-primary dark:bg-primary text-white text-sm font-bold rounded-full mb-3">
                  Step {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold  mb-2">{step.title}</h3>
                <p className=" text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
