//sceed_frontend/src/components/Footer.js

import React from "react";
import { ReactComponent as KenyaFlag } from "../assets/icons/kenya-flag.svg"; // Adjust the path as necessary
import { ReactComponent as YoutubeIcon } from "../assets/icons/youtubeIcon.svg";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebookIcon.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagramIcon.svg";

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
                className="p-2 rounded-l w-full"
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
              className="flex items-center justify-center bg-white"
              style={{
                width: "99px",
                height: "35px",
                padding: "0px",
                borderRadius: "5px",
              }}>
              <KenyaFlag
                width="44"
                height="35"
                className="h-4 mr-2"
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  color: "black",
                  lineHeight: "21px",
                }}>
                KES
              </span>
            </div>
          </div>

          <p>&copy; SceedMillinery 2024</p>
          <a
            href="https://wa.me/+254742125032"
            className="bg-green-500 text-white px-4 py-2 rounded"
            target="_blank"
            rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
