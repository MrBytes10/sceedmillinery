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
        <h2 className="text-lg sm:text-xl md:text-2xl font-poppins font-semibold mb-4 leading-tight">
          Transform your outfits into Extraordinary, Elegant, and Stylish looks
          that stand out.
        </h2>

        <p className="mb-4 text-sm sm:text-base leading-relaxed font-poppins">
          At Sceed Millinery, we pride ourselves on crafting high-quality
          fascinators that embody elegance and sophistication. With a proven
          track record in the fashion industry, our products are trusted by
          countless women who seek to elevate their style. Each piece is
          meticulously designed and handcrafted using only the finest materials,
          ensuring durability and comfort.
        </p>

        <p className="text-sm sm:text-base leading-relaxed font-poppins">
          Our fascinators are more than just accessories; they are
          transformative additions to any outfit. Whether you're dressing for a
          wedding, a race day, or a special occasion, our fascinators add the
          perfect touch of glamour and style. They effortlessly turn ordinary
          looks into stunning, fashion-forward statements, helping you stand out
          in any crowd. Discover how Sceed Millinery can take your outfit to the
          next level and make every moment a stylish one.
        </p>
      </div>
    </div>
  );
}

export default Banner;
