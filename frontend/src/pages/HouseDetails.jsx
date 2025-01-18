import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';

const HouseDetails = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const isForSale = house.type === 'Sell';

    useEffect(() => {
        const fetchHouse = async () => {
            try {
                const { data } = await axios.get(`https://betfelagi-api.vercel.app/api/houses/${id}`);
                setHouse(data);
                if (data.images.length > 0) {
                    setMainImage(data.images[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchHouse();
    }, [id]);

    const handleThumbnailClick = (imageUrl, index) => {
        setMainImage(imageUrl);
        setCurrentImageIndex(index);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
            setMainImage(house.images[currentImageIndex - 1]);
        }
    };

    const handleNextImage = () => {
        if (currentImageIndex < house.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
            setMainImage(house.images[currentImageIndex + 1]);
        }
    };

    if (!house) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="container mx-auto mt-16 py-8 max-w-6xl px-4 lg:px-0">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Image Section */}
                <div className="flex-1">
                    <div className="flex flex-col mb-4">
                        {mainImage && (
                            <img
                                src={mainImage}
                                alt={house.title}
                                className="w-full h-[300px] sm:h-[500px] object-cover rounded-md cursor-pointer transition-transform hover:scale-105"
                                onClick={() => setShowModal(true)}
                            />
                        )}
                        <div className="flex overflow-x-auto mt-4 gap-2">
                            {house.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={house.title}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer transition-transform hover:scale-105"
                                    onClick={() => handleThumbnailClick(image, index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow-md rounded-md">
                        <h1 className="text-xl sm:text-2xl font-bold">{house.title}</h1>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">{house.description}</p>
                        <p className="text-gray-500 text-sm sm:text-lg font-semibold flex items-center mt-4">
                            <FaMapMarkerAlt className="text-red-600 mr-2" size={16} />
                            {house.location}
                        </p>
                    </div>
                </div>

                {/* Sidebar Section */}
                <div className="w-full lg:w-1/3 space-y-6">
                    {/* Price and Category Section */}
                    <div className="bg-gray-100 p-4 shadow-md rounded-md">
                        <h2 className="text-lg sm:text-xl font-bold text-blue-600">${house.price}
                        {!isForSale && <span className="text-sm text-gray-500">/month</span>}
                            </h2>
                        <p className="text-sm sm:text-base font-medium mt-2">Category: {house.category}</p>
                        <p className="text-sm sm:text-base font-medium mt-1">Type: {house.type}</p>
                    </div>

                    {/* User Info Section */}
                    <div className="bg-gray-100 p-4 shadow-md rounded-md flex items-center gap-4">
                        <img
                            src={house.user.profileImage || '/default-profile-icon.png'}
                            alt={house.user.username}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-sm sm:text-lg font-bold">{house.user.username}</h3>
                            <p className="text-gray-600 text-xs sm:text-sm">Email: {house.user.email}</p>
                            <p className="text-gray-600 text-xs sm:text-sm">Phone: {house.user.phoneNumber}</p>
                            <button
                                onClick={() => navigate(`/userprofile/${house.user._id}`)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 text-xs sm:text-sm"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>

                    {/* Safety Tips Section */}
                    <div className="bg-gray-100 p-4 shadow-md rounded-md">
                        <h2 className="text-sm sm:text-xl font-bold">Safety Tips for Buyers</h2>
                        <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 mt-2">
                            <li>Visit the property in person before making any payment.</li>
                            <li>Avoid paying in advance without signed lease agreements.</li>
                            <li>Ensure the property matches the listing description.</li>
                            <li>Meet the seller in a safe public place for discussions.</li>
                            <li>Only proceed if you’re satisfied with the terms and conditions.</li>
                        </ul>
                    </div>

                    {/* Feedback Section */}
                    <div className="bg-gray-100 p-4 shadow-md rounded-md">
                        <h2 className="text-sm sm:text-xl font-bold">Feedback</h2>
                        <p className="text-blue-600 cursor-pointer text-xs sm:text-sm mt-2">View all feedback</p>
                    </div>
                </div>
            </div>

            {/* Modal for Images */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleOverlayClick}
                >
                    <div className="bg-white p-2 rounded-md max-w-5xl max-h-[90vh] w-full relative">
                        <button
                            onClick={handleModalClose}
                            className="absolute top-2 right-2 bg-red-500 text-white text-2xl rounded-full w-8 h-8 flex justify-center items-center"
                        >
                            &times;
                        </button>
                        <div className="flex justify-center mb-4">
                            <img
                                src={mainImage}
                                alt={house.title}
                                className="w-full h-[600px] object-cover rounded-md"
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handlePrevImage}
                                disabled={currentImageIndex === 0}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextImage}
                                disabled={currentImageIndex === house.images.length - 1}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HouseDetails;
