import React from "react";
import { Element } from "react-scroll";

import NavBar from "./components/Home.navbar";
import Header from "./components/Home.header";
import AboutUs from "./components/Home.about_us";
import Programs from "./components/Home.programs";
import ContactUs from "./components/Home.contact_us";
import Footer from "./components/Home.footer";

const Index = () => {
  return (
    <>
      <NavBar />
      <Header />

      <Element name="about_us">
        <AboutUs />
      </Element>

      <Element name="contact_us">
        <ContactUs />
      </Element>

      <Element name="programs">
        <Programs />
      </Element>

      <Footer />

      <style jsx global>{`
        body::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </>
  );
};

export default Index;
