//sceed_front_two/src/components/HomePage.js

import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import ProductGrid from "./ProductGrid";
import BannerOne from "./bannerOne";
import BannerTwo from "./bannerTwo";
import Gallery from "./Gallery";
import Footer from "./Footer";


// Importing gallery images
import gallery1 from "../images/gallery1.jpg";
import gallery2 from "../images/gallery2.jpg";
import gallery3 from "../images/gallery3.jpg";
import gallery4 from "../images/gallery4.jpg";
import gallery5 from "../images/gallery5.jpg";
import gallery6 from "../images/gallery6.jpg";
import gallery7 from "../images/gallery7.jpg";
import gallery8 from "../images/gallery8.jpg";
import gallery9 from "../images/gallery9.jpg";





const HomePage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const lastScrollTop = useRef(0);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop.current) {
        // Scrolling down
        setIsHeaderVisible(false);
      } else {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      lastScrollTop.current = st <= 0 ? 0 : st;

      // Check if filter should be sticky
      if (filterRef.current) {
        const filterOffset = filterRef.current.offsetTop;
        setIsFilterSticky(st > filterOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample data - replace with actual data from your backend
  const products = [
    {
      id: 1,
      name: "Red Fascinator",
      price: "KES 1,500",
          image: "https://via.placeholder.com/150",
      },
      {
          id: 2,
          name: "Blue Fascinator",
          price: "KES 1,400",
          image:"https://via.placeholder.com/150",
      },
      {
          id: 3,
          name: "Green Fascinator",
          price: "KES 1,300",
          image:"https://via.placeholder.com/150",
      },
      {
          id: 4,
          name: "Yellow Fascinator",
          price: "KES 1,200",
          image: "https://via.placeholder.com/150",
      },
      {
          id: 5,
          name: "Black Fascinator",
          price: "KES 1,100",
          image: "https://via.placeholder.com/150",
      },
      {
          id: 6,
          name: "White Fascinator",
          price: "KES 1,000",
          image: "https://via.placeholder.com/150",
      },
      {
          id: 7,
          name: "Leather Handbag",
          price: "KES 7,500",
          image: "https://via.placeholder.com/150",
      },
      {
          id: 8,
          name: "Designer Sunglasses",
          price: "KES 3,800",
          image: "https://via.placeholder.com/150",
      },
      {
          id: 9,
          name: "Elegant Watch",
          price: "KES 12,000",
          image: "https://via.placeholder.com/150",
      },
      {
          id: 10,
          name: "Perfume Set",
          price: "KES 6,000",
          image: "https://via.placeholder.com/150",
      },

    // ... more products from backend
  ];

  const galleryImages = [
      { src: gallery1, alt: " " },
      { src: gallery2, alt: " " },
      { src: gallery3, alt: " " },
      { src: gallery4, alt: " " },
      { src: gallery5, alt: " " },
      { src: gallery6, alt: " " },
      { src: gallery7, alt: " " },
      { src: gallery8, alt: " " },
      { src: gallery9, alt: " " },
    // ... Nore more images needed from backend, don't need API to fetch from
    ];

    // filter Inside HomePage component
    const [priceRange, setPriceRange] = useState(10000);
    const filteredProducts = products.filter(product => {
    const priceValue = parseInt(product.price.replace(/[^0-9]/g, '')); // Extract price value
        return priceValue <= priceRange; // Filter condition
    });

  return (
    <div>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}>
        <Header />
          </div>
          
          <div className="bg-red-500 h-16 w-full border border-black"></div> {/* Empty colored row */}

        {/* main content below header*/}

          <div className="container mx-auto mt-28 px-4"> 

        {/* fitler and product grid */ } 
        <div className="flex flex-col md:flex-row gap-8">
          <div
            ref={filterRef}
            className={`md:w-1/4 ${
              isFilterSticky ? "md:sticky md:top-20" : ""
                          }`}>


          <Filter priceRange={priceRange} setPriceRange={setPriceRange} />
          </div>

          <div className="md:w-3/4">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>

        <BannerOne />
        <BannerTwo />
        <Gallery images={galleryImages} />
        
          </div>


      <Footer />
    </div>
  );
};

export default HomePage;
