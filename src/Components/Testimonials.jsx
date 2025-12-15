import { useEffect, useRef } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter((card) => card !== null);
      if (validCards.length > 0 && sectionRef.current) {
        gsap.from(validCards, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const testimonials = [
    {
      name: "Ahmed Rahman",
      role: "Business Traveler",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      comment:
        "Best ticket booking platform in Bangladesh! Easy to use and always reliable. Highly recommended!",
    },
    {
      name: "Fatima Akter",
      role: "Regular User",
      image: "https://i.pravatar.cc/150?img=45",
      rating: 5,
      comment:
        "I book all my travel tickets through TicketBari. Great prices and excellent customer service.",
    },
    {
      name: "Karim Hossain",
      role: "Student",
      image: "https://i.pravatar.cc/150?img=33",
      rating: 4,
      comment:
        "Very convenient for last-minute bookings. The mobile experience is smooth and fast.",
    },
    {
      name: "Nadia Islam",
      role: "Family Traveler",
      image: "https://i.pravatar.cc/150?img=47",
      rating: 5,
      comment:
        "Love the variety of transport options. Makes planning family trips so much easier!",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Trusted by thousands of travelers across Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-3xl text-blue-600 dark:text-blue-400 mb-4 opacity-50" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 italic">
                "{testimonial.comment}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
