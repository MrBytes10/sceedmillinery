// sceed_frontend/src/pages/AboutPage.js

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import sceedLogo from "../images/sceedWhiteLogo444.png";
import abtTailorMadeModel from "../images/Homepage-Pic-copy2.jpg";
import transformOutfitsModel from "../images/FaithwithModel1.jpg";
import { ReactComponent as HandShakeIcon } from "../assets/icons/HandShakeIcon.svg";
import { ReactComponent as OurCoreActivities } from "../assets/icons/ourCoreActivities.svg";
import { ReactComponent as ValuePropositions } from "../assets/icons/ValuePropositions.svg";
import bgValuePropositions from "../images/abtbackground.jpeg";

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className=" mx-auto px-1 py-0">
        {/*container*/}
        <section
          className="relative h-[296px] w-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)", // White background with 80% opacity
          }}>
          <div className="container mx-auto px-1 h-full flex flex-col items-center justify-center">
            <img
              src={sceedLogo}
              alt="Sceed Millinery Logo"
              className="w-[334px] h-[150px] mb-6 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-6"
            />
            <p className="font-poppins font-medium text-white text-sm md:text-base text-center max-w-[754px] mt-6 md:mt-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-[165px]">
              First Uganda based Milliner 💃💃💃. We were honoured to design
              headwear for our prestigious clients
              <br />
              Invest in timeless headpieces and shop ready to wear range of
              Fascinators.
            </p>
          </div>
        </section>

        <section
          className="flex flex-col md:flex-row items-center p-8 rounded-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with 80% opacity
          }}>
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
            </p>
            {"     "}
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
          <div className="md:w-1/2 pr-8 flex items-center">
            <img
              src={abtTailorMadeModel}
              alt="Model wearing Sceed Millinery fascinator"
              className="w-full rounded-lg h-[80vh] mr-0"
              style={{ maxHeight: "100%", objectFit: "cover" }} // Ensures the image does not exceed the height of its container
            />
          </div>
        </section>

        {/*for the sections with common background*/}
        <section
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgValuePropositions})`,
          }}>
          {/* How we do business*/}
          <section
            className="p-8 rounded-lg shadow-md mb-0 font-bold"
            style={{
              //backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with 80% opacity
              backgroundColor: "rgba(241,241,241,0.9)", // grey-ish background with 90% opacity
            }}>
            <h2 className="text-3xl font-Poppins font-bold text-center mb-8">
              How we do Business
            </h2>
            <div className="flex flex-col items-center mb-8">
              {/* Icon placeholder */}
              <HandShakeIcon
                alt="Handshake Icon"
                className="w-12 h-12 mb-4 bg-gray-10"
              />
              <p className="text-center text-sm font-bold">
                Our Commitment to Customer Relationships
              </p>
              <p className="text-center text-sm font-bold">
                At Sceed Millinery, our customers are at the heart of everything
                we do. We are committed to building strong, lasting
                relationships through a range of personalized services and
                exceptional experiences.
              </p>
            </div>
            {/* <ul className="list-disc pl-6 text-sm">
              <li className="mb-4">
                Personalized Service: We offer a highly personalized service,
                working closely with each client to ensure their fascinator
                perfectly matches their style and occasion.
              </li>
              <li className="mb-4">
                Exceptional Customer Service: Our team is committed to providing
                outstanding customer service at every step, from initial
                consultation to after-sales support, ensuring a seamless and
                enjoyable experience.
              </li>
              <li className="mb-4">
                Exclusive Events & Engagements: We host exclusive events and
                engagements, giving our valued clients the opportunity to
                preview new collections, meet the designers, and enjoy a unique
                shopping experience.
              </li>
              <li className="mb-4">
                Community Engagement: We believe in giving back and actively
                engage with our community through various initiatives and
                partnerships, fostering a sense of connection and shared
                purpose.
              </li>
              <li className="mb-4">
                Quality Assurance & Guarantees: We stand behind the quality of
                our products, offering assurances and guarantees that give our
                customers peace of mind and confidence in their purchase.
              </li>
              <li className="mb-4">
                These customer relationship values are what set Sceed Millinery
                apart, ensuring that every interaction is meaningful, every
                experience is memorable, and every product is nothing short of
                perfection.
              </li>
            </ul> */}
          </section>

          {/* Our Core Activities*/}
          <section
            className="p-8 rounded-lg shadow-md mb-0 font-bold"
            style={{
              backgroundColor: "rgba(206, 205, 200, 0.8)", // White background with 80% opacity
            }}>
            <div className="flex flex-col items-center mb-8">
              {/* Icon placeholder */}
              <OurCoreActivities className="w-12 h-12 mb-4 bg-gray-10" />

              <h2 className="text-3xl font-bold text-center mb-8">
                Our Core Activities
              </h2>

              <p className="text-center text-sm font-bold">
                At Sceed Millinery, every step of our process is thoughtfully
                designed to deliver exceptional products and experiences to our
                customers. Our key activities reflect our dedication to quality,
                innovation, and customer satisfaction.
              </p>
            </div>
            {/* <ul className="list-disc pl-6 text-sm">
              <li className="mb-4">
                Design & Development: Our creative process begins with
                innovative design and meticulous development, ensuring each
                fascinator is both stylish and unique.
              </li>
              <li className="mb-4">
                Sourcing & Procurement: We carefully select and procure the
                finest materials, partnering with trusted suppliers to guarantee
                the quality of our products.
              </li>
              <li className="mb-4">
                Craftsmanship & Production: Our skilled artisans bring each
                design to life with expert craftsmanship, maintaining the high
                standards that define Sceed Millinery.
              </li>
              <li className="mb-4">
                Marketing & Branding: Through strategic marketing and strong
                branding, we make sure our products and brand resonate with our
                target audience.
              </li>
              <li className="mb-4">
                Sales and Distribution: We manage sales and distribution
                channels efficiently to ensure our fascinators reach customers
                promptly and in perfect condition.
              </li>
              <li className="mb-4">
                Customer Relationships: Building and nurturing strong
                relationships with our customers is at the heart of what we do,
                ensuring their satisfaction and loyalty.
              </li>
              <li className="mb-4">
                Quality Control & Assurance: Rigorous quality control and
                assurance processes are in place to ensure that every product
                meets our exacting standards.
              </li>
              <li className="mb-4">
                Financial Management: Prudent financial management underpins all
                our activities, allowing us to maintain stability and invest in
                future growth.
              </li>
              <li className="mb-4">
                Financial Management: Prudent financial management underpins all
                our activities, allowing us to maintain stability and invest in
                future growth.
              </li>
              <li className="mb-4">
                Research and Development: Continuous research and development
                help us innovate and stay ahead of trends, offering our
                customers the latest in fashionable headwear.
              </li>
            </ul> */}
            <p className="text-center text-sm font-bold">
              These activities are the foundation of Sceed Millinery, enabling
              us to consistently deliver high-quality, bespoke fascinators that
              our clients love.
            </p>
          </section>

          <section
            className="p-8 rounded-lg shadow-md mb-0 font-bold"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with 80% opacity
            }}>
            <div className="flex flex-col items-center mb-8">
              {/* Icon placeholder */}
              <ValuePropositions className="w-12 h-12 mb-4 bg-gray-10" />
              <h2 className="text-3xl font-semibold text-center mb-8">
                Value Propositions
              </h2>
              <p className="text-center text-sm font-bold">
                we offer a unique blend of luxury, quality, and exclusivity that
                sets our fascinators apart. Our value propositions reflect our
                commitment to delivering exceptional products and experiences to
                our customers.
              </p>
            </div>
            {/* <ul className="list-disc pl-6 text-sm">
              <li className="mb-4">
                Luxurious Handcrafted Headpieces: Each fascinator is a work of
                art, meticulously handcrafted to exude luxury and elegance,
                perfect for any special occasion.
              </li>
              <li className="mb-4">
                High-Quality Materials: We use only the finest materials,
                ensuring that our headpieces are not only beautiful but also
                durable and comfortable to wear.
              </li>
              <li className="mb-4">
                Photoshoots & Styling: We provide professional photoshoots and
                styling services, helping our clients showcase their fascinators
                in the best possible light.
              </li>
              <li className="mb-4">
                Custom-Made Designs: Our bespoke designs are tailored to each
                client's unique style and preferences, offering a personalized
                touch that enhances their individual look.
              </li>
              <li className="mb-4">
                Exclusive Taste: Sceed Millinery fascinators embody exclusivity
                and sophistication, appealing to those with a refined sense of
                fashion who desire something truly special.
              </li>
              <li className="mb-4">
                These value propositions are what make Sceed Millinery the go-to
                choice for women seeking exquisite, one-of-a-kind fascinators
                that elevate their style.
              </li>
            </ul> */}
          </section>
        </section>

        <section className="flex flex-col w-full md:flex-row items-center bg-customGray p-8 rounded-lg text-[#212121]">
          <div className="md:w-1/2 pr-8">
            <img
              src={transformOutfitsModel}
              alt="Model wearing Sceed Millinery fascinator"
              className="w-full rounded-lg mt-0 ml-0"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-Poppins font-bold mb-4">
              Transform your outfits into Extraordinary, Elegant and Stylish
              looks that stand out.
            </h2>
            <p className="text-sm leading-relaxed">
              {/* At Sceed Millinery, we pride ourselves on crafting high-quality
              fascinators that embody elegance and sophistication. With a proven
              track record in the fashion industry, our products are trusted by
              countless women who seek to elevate their style. Each piece is
              meticulously designed and handcrafted using only the finest
              materials, ensuring durability and comfort. */}
            </p>{" "}
            <p>
              Whether you're dressing for a wedding, a race day, or a special
              occasion, our fascinators add the perfect touch of glamour and
              style. They effortlessly turn ordinary looks into stunning,
              fashion-forward statements, helping you stand out in any crowd.
              Discover how Sceed Millinery can take your outfit to the next
              level and make every moment a stylish one.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
