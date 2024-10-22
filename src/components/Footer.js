//sceed_frontend/src/components/Footer.js

import React from "react";
import { ReactComponent as KenyaFlag } from "../assets/icons/kenya-flag.svg"; // Adjust the path as necessary
import { ReactComponent as YoutubeIcon } from "../assets/icons/youtubeIcon.svg";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebookIcon.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagramIcon.svg";
import { ReactComponent as WhatsAppIcon } from "../assets/icons/WhatsAppIcon.svg";
import { ReactComponent as JeanSignature } from "../assets/icons/jeanGmailSignature.svg";
// import "./Footer.css"; // Import the CSS file for responsiveness

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-2">
              Join our Mailing List and get Notified
            </h3>
            <p className="mb-2">
              Subscribe to get Limited offers and Discounts, giveaways and Great
              deals.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded-l w-full text-black"
              />
              <button className="bg-gray-800 text-white px-4 py-2 rounded-r">
                JOIN
              </button>
            </div>
          </div>

          {/* Socials*/}
          <div>
            <h3 className="font-semibold font-poppins mb-2">Socials</h3>

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

          <div>
            <h3 className="font-semibold font-poppins mb-2">Store Policy</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300"
                  target="_blank"
                  rel="noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300"
                  target="_blank"
                  rel="noreferrer">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-poppins mb-2">Company</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300"
                  target="_blank"
                  rel="noreferrer">
                  Store
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-gray-300"
                  //target="_blank"
                  rel="noreferrer">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-gray-300"
                  //target="_blank"
                  rel="noreferrer">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300"
                  target="_blank"
                  rel="noreferrer">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Kenyan Flag Div */}
        <div className="mt-8 flex justify-between items-center">
          {/* <div className="flex items-center">
            <img src="/kenya-flag.png" alt="Kenya Flag" className="h-4 mr-2" />
            <span>KES</span>
          </div> */}

          <div className="flex items-center">
            <div
              className="flex items-center justify-center bg-white w-20 h-9 p-0 rounded-md"
              // style={{
              //   width: "80px",
              //   height: "35px",
              //   padding: "0px",
              //   borderRadius: "5px",
              // }}
            >
              <KenyaFlag
                className="h-full mr-1 ml-1" // Set height to fill the container and reduce right margin
                aria-hidden="true"
              />
              <span
                className="text-sm font-normal text-black leading-5" // Tailwind classes for styling
              >
                KES
              </span>
            </div>

            <div className="ml-2">
              {" "}
              {/* Add margin to separate the icon from the box */}
              <JeanSignature />
            </div>
          </div>

          <p>&copy; SceedMillinery 2024</p>
          <div className="flex items-center">
            {" "}
            {/* Outer div for border */}
            <a
              href="https://wa.me/+254742125032"
              target="_blank"
              rel="noreferrer"
              className="flex items-center border border-green-500 p-1 rounded-2xl h-10 w-40" // Make the whole container clickable
            >
              <WhatsAppIcon className="mr-2" /> {/* Add margin to the icon */}
              <span className=" flex bg-green-500 text-white px-4 py-2 rounded-r-2xl rounded-l-md h-8 items-center text-center justify-center">
                {" "}
                {/* Use span for styling */}
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
