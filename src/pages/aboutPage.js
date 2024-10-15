// sceed_frontend/src/pages/AboutPage.js

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import abtTailorMadeModel from "../images/abtTailorMadeElegance.png";
import transformOutfitsModel from "../images/transformOutfits.png";
import { ReactComponent as HandShakeIcon } from "../assets/icons/HandShakeIcon.svg";
import { ReactComponent as OurCoreActivities } from "../assets/icons/ourCoreActivities.svg";
import { ReactComponent as ValuePropositions } from "../assets/icons/ValuePropositions.svg";

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="flex flex-col md:flex-row items-center bg-gray-200 p-8 rounded-lg">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-Poppins mb-4">
              Tailor-Made Elegance: Personalized Fascinators Crafted Just for
              You
            </h2>
            <p className="text-sm leading-relaxed">
              We believe that every client is unique, and our approach to
              crafting fascinators reflects this philosophy. Each of our
              products is tailor-made to suit the specific preferences and needs
              of our clients, ensuring that every piece is a true reflection of
              their individual style. We work closely with our customers,
              valuing their input and ideas throughout the design process, to
              create fascinators that not only meet but exceed their
              expectations.
            </p>{" "}
            <br />
            <p>
              Our commitment to personalized service and quality craftsmanship
              sets us apart. We see our clients as partners, and our goal is to
              create not just stunning fascinators but also a collaborative
              experience that is as satisfying as the final product. At Sceed
              Millinery, we cherish the relationships we build with our
              customers, and we are dedicated to making each interaction as
              rewarding and enjoyable as the beautiful, bespoke fascinators we
              create.
            </p>
          </div>
          <div className="md:w-1/2 pr-8">
            <img
              src={abtTailorMadeModel}
              alt="Model wearing Sceed Millinery fascinator"
              className="w-full rounded-lg"
            />
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">
            How we do Business
          </h2>
          <div className="flex flex-col items-center mb-8">
            {/* Icon placeholder */}
            <HandShakeIcon
              alt="Handshake Icon"
              className="w-12 h-12 mb-4 bg-gray-10"
            />

            <p className="text-center text-sm">
              At Sceed Millinery, our customers are at the heart of everything
              we do. We are committed to building strong, lasting relationships
              through a range of personalized services and exceptional
              experiences.
            </p>
          </div>
          <ul className="list-disc pl-6 text-sm">
            <li className="mb-4">
              Personalized Service: We offer a highly personalized service,
              working closely with each client to understand their unique
              preferences and style.
            </li>
            <li className="mb-4">
              Exceptional Customer Service: We strive to exceed expectations by
              providing outstanding customer service at every stage.
            </li>
            <li className="mb-4">
              Quality Assurance: Our dedication to quality ensures that every
              fascinator is meticulously crafted using only the finest
              materials.
            </li>
            {/* Add more list items as needed */}
          </ul>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-16">
          <div className="flex flex-col items-center mb-8">
            {/* Icon placeholder */}
            <OurCoreActivities className="w-12 h-12 mb-4 bg-gray-100" />

            <h2 className="text-3xl font-semibold text-center mb-8">
              Our Core Activities
            </h2>

            <p className="text-center text-sm">
              At Sceed Millinery, every step of our process is thoughtfully
              designed to deliver exceptional products and experiences to our
              customers. Our key activities reflect our dedication to quality,
              innovation, and customer satisfaction.
            </p>
          </div>
          <ul className="list-disc pl-6 text-sm">
            <li className="mb-4">
              Design & Development: Our creative team continuously explores new
              design concepts, pushing the boundaries of millinery art.
            </li>
            <li className="mb-4">
              Sourcing & Procurement: We carefully select and procure the finest
              materials, partnering with trusted suppliers to guarantee the
              quality of our products.
            </li>
            <li className="mb-4">
              Craftsmanship: Our skilled artisans bring designs to life with
              meticulous attention to detail, ensuring each piece meets our
              exacting standards.
            </li>
            {/* Add more list items as needed */}
          </ul>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-16">
          <div className="flex flex-col items-center mb-8">
            {/* Icon placeholder */}
            <ValuePropositions className="w-12 h-12 mb-4 bg-gray-10" />
            <h2 className="text-3xl font-semibold text-center mb-8">
              Value Propositions
            </h2>
            <p className="text-center text-sm">
              We offer a unique blend of luxury, quality, and exclusivity that
              sets our fascinators apart. Our value proposition reflects our
              commitment to delivering exceptional products and experiences to
              our customers.
            </p>
            S
          </div>
          <ul className="list-disc pl-6 text-sm">
            <li className="mb-4">
              Luxurious Handcrafted Headpieces: Each fascinator is a work of
              art, meticulously handcrafted for exquisite beauty and elegance,
              perfect for any special occasion.
            </li>
            <li className="mb-4">
              High-Quality Materials: We use only the finest materials, ensuring
              that our fascinators are not only beautiful but also durable and
              comfortable to wear.
            </li>
            <li className="mb-4">
              Personalized Styling and Consultation: Our expert stylists offer
              personalized consultations to help you find the perfect fascinator
              for your unique style and event.
            </li>
            {/* Add more list items as needed */}
          </ul>
        </section>

        <section className="flex flex-col md:flex-row items-center bg-gray-200 p-8 rounded-lg">
          <div className="md:w-1/2 pr-8">
            <img
              src={transformOutfitsModel}
              alt="Model wearing Sceed Millinery fascinator"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">
              Transform your outfits into Extraordinary, Elegant and Stylish
              looks that stand out.
            </h2>
            <p className="text-sm leading-relaxed">
              At Sceed Millinery, we pride ourselves on crafting high-quality
              fascinators that embody elegance and sophistication. With a proven
              track record in the fashion industry, our products are trusted by
              countless women who seek to elevate their style. Each piece is
              meticulously designed and handcrafted using only the finest
              materials, ensuring durability and comfort.
            </p>{" "}
            <br />
            <p>
              Our fascinators are more than just accessories; they are
              transformative additions to any outfit. Whether you're dressing
              for a wedding, a race day, or a special occasion, our fascinators
              add the perfect touch of glamour and style. They effortlessly turn
              ordinary looks into stunning, fashion-forward statements, helping
              you stand out in any crowd. Discover how Sceed Millinery can take
              your outfit to the next level and make every moment a stylish one.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
