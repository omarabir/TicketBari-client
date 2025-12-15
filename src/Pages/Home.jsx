import React from "react";
import { Helmet } from "react-helmet-async";
import AdvertisedTickets from "../Components/AdvertisedTickets";
import LatestTickets from "../Components/LatestTickets";
import WhyChooseUs from "../Components/WhyChooseUs";
import PopularRoutes from "../Components/PopularRoutes";
import HowItWorks from "../Components/HowItWorks";
import TravelPartners from "../Components/TravelPartners";
import Testimonials from "../Components/Testimonials";
import DownloadApp from "../Components/DownloadApp";
import Banner from "../Components/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - TicketBari</title>
      </Helmet>
      <Banner />
      <PopularRoutes />
      <AdvertisedTickets />
      <LatestTickets />
      <TravelPartners />
      <HowItWorks />
      <Testimonials />
      <DownloadApp />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
