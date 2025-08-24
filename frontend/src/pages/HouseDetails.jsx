import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaEdit, FaTrash, FaPhone, FaEnvelope, FaStar, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS } from '../config/api';

const HouseDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [house, setHouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        const fetchHouseDetails = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.GET_HOUSE(id));
                if (!response.ok) {
                    throw new Error('House not found');
                }
                const data = await response.json();
                setHouse(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHouseDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                const response = await fetch(API_ENDPOINTS.GET_HOUSE(id), {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    navigate('/');
                } else {
                    throw new Error('Failed to delete house');
                }
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % house.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + house.images.length) % house.images.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="bg-gray-200 h-96 rounded-xl mb-6"></div>
                        <div className="space-y-4">
                            <div className="bg-gray-200 h-8 rounded w-3/4"></div>
                            <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                            <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !house) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">House not found</h1>
                        <Link to="/" className="text-rose-600 hover:text-rose-700">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-4 sm:py-8">
                <div className="mb-4 sm:mb-6">
                    <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center space-x-2 text-sm sm:text-base">
                        <FaChevronLeft className="text-sm" />
                        <span>Back to listings</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                    <div className="lg:col-span-2">
                        <div className="relative mb-4 sm:mb-6">
                            <img
                                src={house.images[currentImageIndex]}
                                alt={house.title}
                                className="w-full h-auto max-h-64 sm:max-h-96 object-contain rounded-xl cursor-pointer bg-gray-50"
                                onClick={() => setShowImageModal(true)}
                            />
                            
                            {house.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-colors duration-200"
                                    >
                                        <FaChevronLeft className="text-gray-700 text-sm sm:text-base" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-colors duration-200"
                                    >
                                        <FaChevronRight className="text-gray-700 text-sm sm:text-base" />
                                    </button>
                                    
                                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                                        {house.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-colors duration-200 ${
                                                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {house.images.length > 1 && (
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-6 sm:mb-8">
                                {house.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${house.title} ${index + 1}`}
                                        className={`w-full h-16 sm:h-20 object-cover rounded-lg cursor-pointer transition-opacity duration-200 ${
                                            index === currentImageIndex ? 'opacity-100 ring-2 ring-rose-500' : 'opacity-70 hover:opacity-100'
                                        }`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                <div className="mb-4 sm:mb-0">
                                    <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">{house.title}</h1>
                                    <div className="flex items-center text-gray-600 mb-2 sm:mb-4">
                                        <FaMapMarkerAlt className="mr-2 text-sm" />
                                        <span className="text-sm sm:text-base">{house.location}</span>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right">
                                    <div className="text-2xl sm:text-3xl font-bold text-rose-600">
                                        ETB {house.price.toLocaleString()}
                                    </div>
                                    <div className="text-gray-600 text-sm sm:text-base">
                                        {house.type === 'Rent' ? 'per month' : 'for sale'}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                                <div className="flex items-center space-x-2">
                                    <FaBed className="text-gray-400 text-sm sm:text-base" />
                                    <span className="text-gray-700 text-sm sm:text-base">{house.bedrooms} Bedrooms</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaBath className="text-gray-400 text-sm sm:text-base" />
                                    <span className="text-gray-700 text-sm sm:text-base">{house.bathrooms} Bathrooms</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaRulerCombined className="text-gray-400 text-sm sm:text-base" />
                                    <span className="text-gray-700 text-sm sm:text-base">{house.area} sq ft</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{house.description}</p>
                            </div>

                            {user && user._id === house.user._id && (
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                                    <Link
                                        to={`/edit-house/${house._id}`}
                                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 text-sm sm:text-base"
                                    >
                                        <FaEdit />
                                        <span>Edit Listing</span>
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm sm:text-base"
                                    >
                                        <FaTrash />
                                        <span>Delete Listing</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm lg:sticky lg:top-24">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                        <FaPhone className="text-rose-600 text-sm sm:text-base" />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">Phone</p>
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">{house.user.phoneNumber}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                        <FaEnvelope className="text-rose-600 text-sm sm:text-base" />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">Email</p>
                                        <p className="font-medium text-gray-900 text-sm sm:text-base break-all">{house.user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-rose-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-rose-700 transition-colors duration-200 text-sm sm:text-base">
                                Contact Owner
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showImageModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 z-10 p-2"
                        >
                            <FaTimes className="text-xl sm:text-2xl" />
                        </button>
                        
                        <img
                            src={house.images[currentImageIndex]}
                            alt={house.title}
                            className="max-w-full max-h-full object-contain"
                        />
                        
                        {house.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-200"
                                >
                                    <FaChevronLeft className="text-gray-700 text-sm sm:text-base" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-200"
                                >
                                    <FaChevronRight className="text-gray-700 text-sm sm:text-base" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HouseDetails;
