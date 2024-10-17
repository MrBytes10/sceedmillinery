import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import contactPageBackground from "../images/woman-portrait-female-african-american.jpg";
import { ReactComponent as YoutubeIcon } from "../assets/icons/youtubeIcon.svg";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebookIcon.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagramIcon.svg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <Header />
      <section
        style={{
          backgroundImage: `url(${contactPageBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
        {" "}
        <div
          className="w-full mx-auto px-4 py-12"
          style={{
            backgroundColor: "rgba(241,241,241,0.8)", // grey-ish background with 90% opacity
          }}>
          <h1 className="text-2xl font-semibold text-center mb-8">
            Contact Us Today
          </h1>

          <div className="text-center mb-12">
            <p className="mb-8 text-gray-700 leading-relaxed">
              We would love to hear from you! Whether you have a question about
              our products, need assistance with an order, or are interested in
              a custom-made design, our team is here to help. At Sceed
              Millinery, we are committed to providing you with exceptional
              service and ensuring your experience with us is as delightful as
              our fascinators.
            </p>

            <div className="mb-8">
              <h2 className="mb-4 font-normal">How to Reach Us:</h2>
              <p className="mb-2 font-bold">Phone: [0787315801]</p>
              <p className="font-bold">Email: [faitham.faith50@gmail.com]</p>
            </div>

            <div className="mb-8">
              <p className="mb-4">
                You can also connect with us on social media for the latest
                updates, inspiration, and exclusive offers.
              </p>
              <h3 className="font-medium mb-4">Follow Us:</h3>
              <div className="flex justify-center gap-4">
                <div className="flex space-x-2">
                  <a
                    href="https://www.instagram.com/sceedmillinery?igshi..."
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xl">
                    <InstagramIcon />{" "}
                  </a>
                  <a
                    href="https://web.facebook.com/glamandpoppy/?_rdc=1&_rdr"
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xl">
                    {" "}
                    <FacebookIcon />{" "}
                  </a>
                  <a
                    href="https://www.youtube.com/@faithnamalwa"
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xl">
                    {" "}
                    <YoutubeIcon />{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-center mb-4">Send Us a Message:</h2>
            <p className="text-center text-gray-700 mb-8">
              Fill out the form below with your inquiry, and we'll get back to
              you as soon as possible. We look forward to assisting you!
            </p>
          </div>
          <section
            style={{
              backgroundColor: "rgb(255,255,255)", // grey-ish background with 90% opacity
              padding: "1rem",
              borderRadius: "5px",
            }}>
            {" "}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium mb-2 ">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Jean Solomon Mukwa"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="solomonjeann@gmail.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="What is the Subject of your Message"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border-1 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="What is your Message"
                  required></textarea>
              </div>

              <button
                type="submit"
                className="w-1/3 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200">
                Send Message
              </button>
            </form>
          </section>

          <div className="text-center mt-12">
            <p className="text-gray-700">
              At Sceed Millinery, your satisfaction is our priority. Whether
              you're looking to purchase one of our handcrafted fascinators or
              simply have a question, we're here to ensure your experience is
              nothing short of exceptional. Reach out to us today!
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
