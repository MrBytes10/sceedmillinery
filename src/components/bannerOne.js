//sceed_frontend/src/components/bannerOne.js

import React from "react";
//import fascinator from "../images/model-with-fascinator.png";
import fascinator from "../images/Homepage-Pic-copy2.jpg";

function Banner() {
  return (
    <div className="bg-customGray text-customDark p-6 md:p-8 mb-8 rounded-lg flex flex-col md:flex-row">
      {/* Image section */}
      <div className="w-full md:w-1/2 md:pr-8 flex items-stretch mb-6 md:mb-0">
        <div className="w-full h-full relative">
          <img
            src={fascinator}
            alt="Model wearing fascinator"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Text section */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex flex-col justify-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-playfair font-semibold tracking-wide mb-4 leading-tight">
          Elevate Your Style with Sceed Millinery
        </h2>

        <p className="mb-4 text-sm sm:text-base leading-relaxed font-poppins font tracking-wide">
          At Sceed Millinery, we create exquisite, handcrafted fascinators that
          blend elegance, sophistication, and style. Each piece is made from the
          finest materials and trusted by women who seek timeless fashion with a
          bold statement.
        </p>

        <p className="text-sm sm:text-base leading-relaxed font-poppins tracking-wide">
          Whether for weddings, race days, or special occasions, our fascinators
          go beyond accessories — they transform your look with effortless
          glamour and fashion-forward flair. Discover how Sceed Millinery turns
          ordinary moments into unforgettable style statements.
        </p>
      </div>
    </div>
  );
}

export default Banner;
