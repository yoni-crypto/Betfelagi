import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS } from '../config/api';

const UserProfile = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            navigate('/login');
            return;
        }

        const fetchUserHouses = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.GET_USER_HOUSES(user._id), {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setHouses(data);
                } else {
                    throw new Error('Failed to fetch houses');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserHouses();
    }, [user, authLoading, navigate]);

    const handleDelete = async (houseId) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                const response = await fetch(API_ENDPOINTS.GET_HOUSE(houseId), {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    setHouses(prev => prev.filter(house => house._id !== houseId));
                } else {
                    throw new Error('Failed to delete house');
                }
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center py-16">
                        <div className="flex items-center space-x-3">
                            <div className="animate-spin h-8 w-8 border-4 border-rose-600 border-t-transparent rounded-full"></div>
                            <span className="text-gray-600 font-medium">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-4 sm:py-8">
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-4 sm:py-8">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center space-x-4 sm:space-x-6 mb-4 sm:mb-0">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-100 rounded-full flex items-center justify-center">
                                <span className="text-xl sm:text-2xl font-bold text-rose-600">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{user?.username}</h1>
                                <p className="text-gray-600 text-sm sm:text-base mb-1">{user?.email}</p>
                                {user?.phoneNumber && (
                                    <p className="text-gray-600 text-sm sm:text-base">{user.phoneNumber}</p>
                                )}
                            </div>
                        </div>
                        <Link
                            to="/create-listing"
                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 text-sm sm:text-base"
                        >
                            <FaPlus />
                            <span>Add Listing</span>
                        </Link>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                        My Listings ({houses.length})
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    {houses.length === 0 ? (
                        <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-sm">
                            <p className="text-gray-600 mb-4 text-sm sm:text-base">You haven't created any listings yet</p>
                            <Link
                                to="/create-listing"
                                className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 text-sm sm:text-base"
                            >
                                <FaPlus className="mr-2" />
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
                                        
                                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Link
                                                to={`/edit-house/${house._id}`}
                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                                            >
                                                <FaEdit className="text-gray-600 text-xs sm:text-sm" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(house._id)}
                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
                                            >
                                                <FaTrash className="text-white text-xs sm:text-sm" />
                                            </button>
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

export default UserProfile;
