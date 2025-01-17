import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';

const HouseDetails = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHouse = async () => {
            try {
                const { data } = await axios.get(`https://betfelagi-api.vercel.app/api/houses/${id}`);
                setHouse(data);
                if (data.images.length > 0) {
                    setMainImage(`https://betfelagi-api.vercel.app/${data.images[0]}`);
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
        // Close the modal if the overlay (background) is clicked
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
            setMainImage(`https://betfelagi-api.vercel.app/${house.images[currentImageIndex - 1]}`);
        }
    };

    const handleNextImage = () => {
        if (currentImageIndex < house.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
            setMainImage(`https://betfelagi-api.vercel.app/${house.images[currentImageIndex + 1]}`);
        }
    };

    if (!house) return <p>Loading...</p>;

    return (
        <div className="container mx-auto mt-16 py-8 max-w-6xl">
            <div className="flex flex-col p-2 lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex flex-col mb-4">
                        {mainImage && (
                            <img
                                src={mainImage}
                                alt={house.title}
                                className="w-full h-[500px] object-cover rounded-md cursor-pointer"
                                onClick={() => setShowModal(true)}
                            />
                        )}
                        <div className="flex overflow-x-auto mt-4">
                            <div className="flex gap-2">
                                {house.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`https://betfelagi-api.vercel.app/${image}`}
                                        alt={house.title}
                                        className="w-20 h-20 object-cover rounded-md cursor-pointer"
                                        onClick={() => handleThumbnailClick(`http://localhost:5000/${image}`, index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow-md rounded-md mb-4">
                        <h1 className="text-2xl font-bold">{house.title}</h1>
                        <p className="text-gray-600">{house.description}</p>
                        <p className="text-gray-500 text-lg font-semibold flex items-center mb-4">
                            <FaMapMarkerAlt className="text-red-600 mr-2" size={14} />
                            {house.location}
                        </p>
                        {/* <p className="text-lg font-bold text-blue-600 mt-2">${house.price}/month</p> */}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-1/3 space-y-4">
                    <div className="bg-gray-100 p-4 shadow-md rounded-md mb-4">
                        <h2 className="text-lg font-bold text-blue-600 mt-2">${house.price}/month</h2>

                        <p className="text-lg font-medium mt-2">Category: {house.category}</p>
                        <p className="text-lg font-medium mt-1">Type: {house.type}</p>
                        <button
                            onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                            className="bg-green-500 text-white px-4 py-2 mr-6 rounded-md mt-4"
                        >
                            {showPhoneNumber ? house.user.phoneNumber : 'Show Contact'}
                        </button>

                        <button
                            onClick={() => navigate('/chat')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                        >
                            Start chat
                        </button>
                    </div>
                    <div className="bg-gray-100 p-4 shadow-md rounded-md mb-4">
                        <h2 className="text-xl font-bold">Safety tips</h2>
                        <ul className="list-disc list-inside">
                            <li>Avoid paying in advance, even for delivery</li>
                            <li>Meet with the seller at a safe public place</li>
                            <li>Inspect the item and ensure it's exactly what you want</li>
                            <li>Only pay if you're satisfied</li>
                        </ul>
                    </div>
                    <div className="bg-gray-100 p-4 shadow-md rounded-md">
                        <h2 className="text-xl font-bold">Feedback</h2>
                        <p className="text-blue-600 cursor-pointer">View all feedback</p>
                    </div>
                </div>
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleOverlayClick}
                >
                    <div className="bg-white p-6 rounded-md max-w-5xl max-h-[90vh] w-full relative">
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
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextImage}
                                disabled={currentImageIndex === house.images.length - 1}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
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
