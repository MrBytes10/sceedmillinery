import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";
import Filter from "./Filter";
import ProductGrid from "./ProductGrid";
import BannerOne from "./bannerOne";
import BannerTwo from "./bannerTwo";
import Gallery from "./Gallery";
import Footer from "./Footer";

// Importing gallery images (assuming these imports are correct)
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
    const [priceRange, setPriceRange] = useState(10000);
    const [filterSticky, setFilterSticky] = useState(false);
    const [showAdditionalSections, setShowAdditionalSections] = useState(false);

    const filterRef = useRef(null);
    const productGridRef = useRef(null);
    const productsSectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (filterRef.current && productGridRef.current && productsSectionRef.current) {
                const scrollY = window.scrollY;
                const filterOffset = filterRef.current.offsetTop;
                const productGridBottom = productGridRef.current.getBoundingClientRect().bottom;
                const productsSectionBottom = productsSectionRef.current.getBoundingClientRect().bottom;

                // Make the filter sticky while scrolling through products----TO-DO
                //setFilterSticky(scrollY >= filterOffset && productGridBottom > window.innerHeight);

                // Show additional sections when scrolled past products
                setShowAdditionalSections(productsSectionBottom <= window.innerHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Sample data - replace with actual data from your backend
    const products = [
        { id: 1, name: "Red Fascinator", price: "KES 1,500", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Blue Fascinator", price: "KES 1,400", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Green Fascinator", price: "KES 1,300", image: "https://via.placeholder.com/150" },
        { id: 4, name: "Yellow Fascinator", price: "KES 1,200", image: "https://via.placeholder.com/150" },
        { id: 5, name: "Black Fascinator", price: "KES 1,100", image: "https://via.placeholder.com/150" },
        { id: 6, name: "White Fascinator", price: "KES 1,000", image: "https://via.placeholder.com/150" },
        { id: 7, name: "Leather Handbag", price: "KES 7,500", image: "https://via.placeholder.com/150" },
        { id: 8, name: "Designer Sunglasses", price: "KES 3,800", image: "https://via.placeholder.com/150" },
        { id: 9, name: "Elegant Watch", price: "KES 12,000", image: "https://via.placeholder.com/150" },
        { id: 10, name: "Perfume Set", price: "KES 6,000", image: "https://via.placeholder.com/150" },
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
    ];

    const filteredProducts = products.filter((product) => {
        const priceValue = parseInt(product.price.replace(/[^0-9]/g, ""));
        return priceValue <= priceRange;
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* Empty row to separate header */}
            <div style={{ backgroundColor: '#CECDC8' }} className="h-10 w-full border"></div>


            {/* Main content */}
            <main className="flex-grow container mx-auto px-4 mt-8">
                {/* Filter and product grid */}
                <div className="flex flex-col md:flex-row gap-8" ref={productsSectionRef}>
                    <div
                        ref={filterRef}
                        className={`md:w-1/4 ${filterSticky ? "md:sticky md:top-20" : ""
                            }`}
                        style={{ height: 'fit-content' }}
                    >
                        <Filter priceRange={priceRange} setPriceRange={setPriceRange} />
                    </div>

                    <div ref={productGridRef} className="md:w-3/4">
                        <ProductGrid products={filteredProducts} />
                    </div>
                </div>

                {/* Additional sections */}
                {showAdditionalSections && (
                    <>
                        <BannerOne />
                        <BannerTwo />
                        <Gallery images={galleryImages} />
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;