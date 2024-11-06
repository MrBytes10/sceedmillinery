//sceed_frontend/src/components/Footer.js

import React from "react";
import { ReactComponent as UgandanFlag } from "../assets/icons/UgandanFlag.svg";
import { ReactComponent as YoutubeIcon } from "../assets/icons/youtubeIcon.svg";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebookIcon.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagramIcon.svg";
import { ReactComponent as WhatsAppIcon } from "../assets/icons/WhatsAppIcon.svg";
import { ReactComponent as JeanSignature } from "../assets/icons/jeanGmailSignature.svg";

function Footer() {
  return (
    <div className="container mx-auto px-0">
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          {/* Changed grid-cols-4 to grid-cols-1 on mobile and grid-cols-4 on medium screens and up */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Newsletter Section */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-2">
                Join our Mailing List and get Notified
              </h3>
              <p className="mb-2">
                Subscribe to get Limited offers and Discounts, giveaways and
                Great deals.
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

            {/* Socials Section */}
            <div className="space-y-2">
              <h3 className="font-semibold font-poppins mb-2">Socials</h3>
              <div className="flex space-x-2">
                <a
                  href="https://www.instagram.com/sceedmillinery?igshi..."
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl">
                  <InstagramIcon />
                </a>
                <a
                  href="https://web.facebook.com/glamandpoppy/?_rdc=1&_rdr"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl">
                  <FacebookIcon />
                </a>
                <a
                  href="https://www.youtube.com/@faithnamalwa"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl">
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            {/* Store Policy Section */}
            <div className="space-y-2">
              <h3 className="font-semibold font-poppins mb-2">Store Policy</h3>
              <ul className="space-y-1">
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

            {/* Company Section */}
            <div className="space-y-2">
              <h3 className="font-semibold font-poppins mb-2">Company</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:text-gray-300" rel="noreferrer">
                    Store
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-gray-300"
                    rel="noreferrer">
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-gray-300"
                    rel="noreferrer">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="hover:text-gray-300"
                    target="_blank"
                    rel="noreferrer">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section - Made responsive */}
          <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
            {/* Flag and Signature */}
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-white w-20 h-9 p-0 rounded-md">
                <UgandanFlag className="h-full mr-1 ml-1" aria-hidden="true" />
                <span className="text-sm font-normal text-black leading-5">
                  UGX
                </span>
              </div>
              <div className="ml-2">
                <JeanSignature />
              </div>
            </div>

            {/* Copyright */}
            <p className="text-center">&copy; SceedMillinery 2024</p>

            {/* WhatsApp Button */}
            <div className="flex items-center">
              <a
                href="https://wa.me/+256787315801"
                target="_blank"
                rel="noreferrer"
                className="flex items-center border border-green-500 p-1 rounded-2xl h-10 w-40">
                <WhatsAppIcon className="mr-2" />
                <span className="flex bg-green-500 text-white px-4 py-2 rounded-r-2xl rounded-l-md h-8 items-center text-center justify-center">
                  WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
