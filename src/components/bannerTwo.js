//sceed_frontend/src/components/TailorMadeSection.js

import React from "react";
import tailorMadeModel from "../images/FaithwithModel1.jpg";

function TailorMadeSection() {
  return (
    <div className="bg-white p-6 md:p-8 mb-8 rounded-lg shadow-md flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 md:pr-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold font-playfair tracking-wide mb-4">
          Custom-made & Ready to Wear Elegance
        </h2>
        <p className="text-sm sm:text-base mb-4 leading-relaxed font-poppins tracking-wide">
          At Sceed Millinery, we believe every woman deserves a fascinator as
          unique as she is. That's why each piece is custom-crafted to reflect
          your individual style and preferences.
        </p>
        <p className="text-sm sm:text-base mb-4 leading-relaxed font-poppins tracking-wide">
          We collaborate closely with our clients—valuing your ideas and
          input—to design fascinators that exceed expectations. More than
          accessories, our creations are the result of a thoughtful, personal
          process and unmatched craftsmanship.
        </p>
        <p className="text-sm sm:text-base leading-relaxed font-poppins tracking-wide">
          Experience the art of bespoke millinery, where every detail is
          intricately made just for you.
        </p>
      </div>
      <div className="w-full md:w-1/3 mt-6 md:mt-0 flex items-stretch">
        <div className="w-full h-48 sm:h-64 md:h-auto relative">
          <img
            src={tailorMadeModel}
            alt="Model wearing fascinator"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default TailorMadeSection;
