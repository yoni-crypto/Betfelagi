import React from 'react';

const Showcase = () => {
    return (
        <div className="relative mt-12 mb-12">
            <img
                src="./img.avif" 
                alt="Real Estate Showcase"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-50 rounded-lg" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <p className="text-lg">
                    Browse through our collection of beautiful properties and find the one that fits your needs.
                </p>
            </div>
        </div>
    );
};

export default Showcase;
