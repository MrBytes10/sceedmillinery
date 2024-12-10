import React, { useState } from "react";
import { Award, Trophy, Star, ChevronRight, ChevronLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AwardsPage = () => {
  const [selectedAward, setSelectedAward] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  // Awards data array
  const awards = [
    {
      id: 1,
      title: "Gold Winner - Fashion Accessories",
      organization: "KEOnline Digitally Fit Awards 2024",
      category: "Fashion Accessories",
      date: "December 6, 2024",
      description:
        "Recognized for creating outstanding online impact in East Africa's fashion accessories industry.",
      type: "Gold Winner",
      achievements: [
        "Top Digitally Fit Brand in Fashion Accessories",
        "Excellence in Online Brand Presence",
        "Outstanding Digital Innovation",
      ],
      images: [
        {
          src: "https://res.cloudinary.com/dlm0am5pt/image/upload/v1733780265/FaithHoldingAward_ufhews.jpg",
          // Replace with actual image path
          alt: "Awards Ceremony Moment",
          caption: "Receiving the award at the ceremony",
        },

        {
          src: "https://res.cloudinary.com/dlm0am5pt/image/upload/v1733780263/FascinatorAward_czjruk.jpg", // Replace with actual image path
          alt: "Gold Winner Trophy",
          caption: "KEOnline Digitally Fit Awards Trophy",
        },

        {
          src: "https://res.cloudinary.com/dlm0am5pt/image/upload/v1733780265/AwardCertificate_locqno.jpg",
          // Replace with actual image path
          alt: "Certificate of Excellence - KEOnline Digitally Fit Awards",
          caption: "Official Certificate of Excellence",
        },
      ],
    },
  ];

  const nextImage = () => {
    setSelectedImage(
      (prev) => (prev + 1) % awards[selectedAward].images.length
    );
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + awards[selectedAward].images.length) %
        awards[selectedAward].images.length
    );
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mb-6" />
              <h1 className="text-4xl font-bold mb-4">Our Awards</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Celebrating excellence and innovation in fashion accessories
              </p>
            </div>
          </div>
        </div>

        {/* Awards Gallery */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {awards.map((award, index) => (
              <div
                key={award.id}
                className={`transition-opacity duration-300 ${
                  index === selectedAward ? "block" : "hidden"
                }`}>
                {/* Image Gallery */}
                <div className="mb-12">
                  <div className="relative bg-[customgray] aspect-video rounded-lg overflow-hidden flex h-[85vh] w-full items-centerjustify-center">
                    {/* Main Image */}
                    <img
                      src={award.images[selectedImage].src}
                      alt={award.images[selectedImage].alt}
                      className="w-full h-full object-contain"
                    />

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-4">
                      <p className="text-center">
                        {award.images[selectedImage].caption}
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail Navigation */}

                  <div className="flex justify-center gap-4 mt-4">
                    {award.images.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-24 h-16 rounded-lg overflow-hidden ${
                          idx === selectedImage ? "ring-2 ring-yellow-500" : ""
                        }`}>
                        <img
                          src={image.src}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Award Details Card */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  {/* Award Header */}
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{award.title}</h2>
                        <p className="text-yellow-100">{award.organization}</p>
                      </div>
                      <Award className="w-12 h-12" />
                    </div>
                  </div>

                  {/* Award Details */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left Column - Details */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Award Details
                          </h3>
                          <div className="mt-2 space-y-2">
                            <p className="flex items-center text-gray-600">
                              <Star className="w-5 h-5 mr-2 text-yellow-500" />
                              Category: {award.category}
                            </p>
                            <p className="flex items-center text-gray-600">
                              <Star className="w-5 h-5 mr-2 text-yellow-500" />
                              Awarded: {award.date}
                            </p>
                            <p className="flex items-center text-gray-600">
                              <Star className="w-5 h-5 mr-2 text-yellow-500" />
                              Type: {award.type}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Key Achievements
                          </h3>
                          <ul className="mt-2 space-y-2">
                            {award.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-start">
                                <Trophy className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                                <span className="text-gray-600">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Column - Description */}
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            About the Award
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {award.description}
                          </p>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                            Recognition Highlights
                          </h3>
                          <p className="text-yellow-700">
                            This prestigious award recognizes our commitment to
                            digital excellence and innovation in East Africa's
                            fashion industry.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AwardsPage;

// // sceed_frontend/src/pages/AwardsPage.js

// import React from "react";
// import { Card } from "antd";
// import { Trophy } from "lucide-react"; // Importing a trophy icon from Lucide
// import { ReactComponent as AwardsIcon } from "../assets/icons/AwardsIcon.svg"; // Example icon for awards section
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const awardsData = [
//   {
//     title: "Best Fashion Accessories",
//     year: 2023,
//     description: "Awarded for excellence in design and craftsmanship.",
//   },
//   {
//     title: "Customer Choice Award",
//     year: 2022,
//     description:
//       "Recognized for outstanding customer service and satisfaction.",
//   },
//   {
//     title: "Innovative Design Award",
//     year: 2021,
//     description:
//       "Celebrated for creativity and innovation in fashion accessories.",
//   },
//   // Add more awards as needed
// ];

// const AwardsPage = () => {
//   return (
//     <div>
//       <Header />
//       <section className="bg-gray-50 p-8">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-6">
//             Our Awards & Recognitions
//           </h2>
//           <div className="flex flex-wrap justify-center">
//             {awardsData.map((award, index) => (
//               <Card
//                 key={index}
//                 className="m-4 w-80 shadow-lg rounded-lg"
//                 style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
//                 cover={<AwardsIcon className="w-full h-32 object-cover" />}>
//                 <div className="flex items-center mb-2">
//                   <Trophy className="text-yellow-500 mr-2" />
//                   <h3 className="text-xl font-semibold">{award.title}</h3>
//                 </div>
//                 <p className="text-gray-600">{award.year}</p>
//                 <p className="text-gray-500">{award.description}</p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// };

// export default AwardsPage;
