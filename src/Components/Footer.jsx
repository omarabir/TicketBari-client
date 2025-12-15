import { Link } from "react-router";
import logo from "../assets/logo.png";
import {
  FaEnvelope,
  FaPhone,
  FaCcVisa,
  FaCcMastercard,
  FaCcStripe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#09335b] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-3 group my-2">
              <img
                src={logo}
                alt="TicketBari Logo"
                className=" w-24 -mt-5 -ml-4"
              />
              <span className="text-2xl lg:text-3xl -mb-10 -ml-14 -mt-8 font-bold  bg-clip-text ">
                TicketBari
              </span>
            </Link>
            <p className="text-gray-100 text-sm">
              Book bus, train, launch & flight tickets easily. Your trusted
              travel companion for all journeys across Bangladesh.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-100 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-tickets"
                  className="hover:text-primary transition"
                >
                  All Tickets
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-100 text-sm">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-primary" />
                <span>support@ticketbari.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-primary" />
                <span>+880 1234-567890</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="flex flex-wrap gap-4 text-4xl text-gray-400">
              <FaCcVisa className="hover:text-primary transition cursor-pointer" />
              <FaCcMastercard className="hover:text-primary transition cursor-pointer" />
              <FaCcStripe className="hover:text-primary transition cursor-pointer" />
            </div>
            <p className="text-gray-400 text-xs mt-4">
              Secure payments powered by Stripe
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 TicketBari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
