import React from "react";

const GalleryImage = ({ src, alt, className }) => (
    <div
        className={`relative overflow-hidden ${className}`}
        style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg opacity-0 hover:opacity-100 transition-opacity duration-300">{alt}</p>
        </div>
    </div>
);

const Gallery = ({ images }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            {[0, 1, 2].map((group) => (
                <div key={group} className="flex-1 flex flex-col md:flex-row gap-4">
                    {/* Large Image */}
                    <GalleryImage
                        src={images[group * 3].src}
                        alt={images[group * 3].alt}
                        className="w-full md:w-2/3 h-96"
                    />
                    {/* Two smaller images stacked vertically */}
                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <GalleryImage
                            src={images[group * 3 + 1].src}
                            alt={images[group * 3 + 1].alt}
                            className="w-full h-48"
                        />
                        <GalleryImage
                            src={images[group * 3 + 2].src}
                            alt={images[group * 3 + 2].alt}
                            className="w-full h-44"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
