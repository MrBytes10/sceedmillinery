
//sceed_frontend/src/components/TailorMadeSection.js

import React from "react";
import tailorMadeModel from "../images/tailor-made-model.png";

function TailorMadeSection() {
    return (
        <div className="bg-white p-6 md:p-8 mb-8 rounded-lg shadow-md flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 md:pr-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
                    Tailor-Made Elegance: Personalized Fascinators Crafted Just for You
                </h2>
                <p className="text-sm sm:text-base mb-4 leading-relaxed">
                    We believe that every client is unique, and our approach to crafting fascinators reflects this philosophy. Each of our products is tailor-made to suit the specific preferences and needs of our clients, ensuring that every piece is a true reflection of their individual style. We work closely with our customers, valuing their input and ideas throughout the design process, to create fascinators that not only meet but exceed their expectations.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                    Our commitment to personalized service and quality craftsmanship sets us apart. We see our clients as partners, and our goal is to create not just stunning fascinators but also a collaborative experience that is as satisfying as the final product. At Sceed Millinery, we cherish the relationships we build with our customers, and we are dedicated to making each interaction as rewarding and enjoyable as the beautiful, bespoke fascinators we create.
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
