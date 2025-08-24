import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS } from '../config/api';

const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.GET_USER(userId));
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const userData = await response.json();
                setUser(userData);

                const housesResponse = await fetch(API_ENDPOINTS.GET_USER_HOUSES(userId));
                if (housesResponse.ok) {
                    const housesData = await housesResponse.json();
                    setHouses(housesData);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="bg-gray-200 h-32 rounded-xl mb-6"></div>
                        <div className="space-y-4">
                            <div className="bg-gray-200 h-8 rounded w-1/4"></div>
                            <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">User not found</h1>
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
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-100 rounded-full flex items-center justify-center">
                            <span className="text-xl sm:text-2xl font-bold text-rose-600">
                                {user.username?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{user.username}</h1>
                            <p className="text-gray-600 text-sm sm:text-base mb-1">{user.email}</p>
                            {user.phoneNumber && (
                                <p className="text-gray-600 text-sm sm:text-base">{user.phoneNumber}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                        {user.username}'s Listings ({houses.length})
                    </h2>

                    {houses.length === 0 ? (
                        <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-sm">
                            <p className="text-gray-600 mb-4 text-sm sm:text-base">No listings found</p>
                            <Link
                                to="/create-listing"
                                className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 text-sm sm:text-base"
                            >
                                Create Your First Listing
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {houses.map((house) => (
                                <div key={house._id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                                    <div className="relative h-40 sm:h-48 overflow-hidden">
                                        <img
                                            src={house.images[0]}
                                            alt={house.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                house.type === 'Rent' 
                                                    ? 'bg-rose-100 text-rose-800' 
                                                    : 'bg-gray-900 text-white'
                                            }`}>
                                                {house.type === 'Rent' ? 'For Rent' : 'For Sale'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-3 sm:p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 text-sm sm:text-base">
                                            {house.title}
                                        </h3>
                                        
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <FaMapMarkerAlt className="text-gray-400 mr-1 text-xs sm:text-sm" />
                                            <span className="text-xs sm:text-sm line-clamp-1">{house.location}</span>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <FaBed className="mr-1" />
                                                    <span>{house.bedrooms}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <FaBath className="mr-1" />
                                                    <span>{house.bathrooms}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <FaRulerCombined className="mr-1" />
                                                    <span>{house.area} sq ft</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-base sm:text-lg font-bold text-rose-600">
                                                ETB {house.price.toLocaleString()}
                                            </div>
                                            <Link
                                                to={`/houses/${house._id}`}
                                                className="text-rose-600 hover:text-rose-700 text-xs sm:text-sm font-medium"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
