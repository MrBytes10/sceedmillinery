//sceed_frontend/src/components/AboutPage.js

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const AboutPage = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Sceed Millinery</h1>
        <p className="mb-4">
          Sceed Millinery is a leading brand in the world of fascinators and
          elegant headwear. Our passion for craftsmanship and attention to
          detail sets us apart in the industry.
        </p>
        <p className="mb-4">
          Founded in [year], we have been creating bespoke fascinators for
          discerning clients who appreciate the finest quality and unique
          designs.
        </p>
        {/* Add more content about your company, mission, values, etc. */}
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
