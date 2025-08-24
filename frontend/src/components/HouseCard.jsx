import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaStar } from 'react-icons/fa';
import { AuthContext } from '../context/authContext';

const HouseCard = ({ house, onDelete }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const isOwner = user && house.user && house.user._id === user._id;
    
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const getPropertyTypeColor = (type) => {
        return type === 'Rent' ? 'bg-rose-100 text-rose-800' : 'bg-gray-900 text-white';
    };

    // Generate random rating for demo (in real app, this would come from backend)
    const rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
    const reviewCount = Math.floor(Math.random() * 100) + 10; // Random review count

    return (
        <div className="group cursor-pointer">
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-xl mb-3">
                <div
                    onClick={() => navigate(`/houses/${house._id}`)}
                    className="aspect-[4/3] overflow-hidden"
                >
                    {house.images && house.images.length > 0 ? (
                        <img
                            src={house.images[0]}
                            alt={house.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <FaBed className="text-gray-500 text-xl" />
                                </div>
                                <p className="text-gray-500 text-sm">No image available</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Property Type Badge - Shows "For Rent" or "For Sale" */}
                <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm ${getPropertyTypeColor(house.type)}`}>
                        {house.type === 'Rent' ? 'For Rent' : 'For Sale'}
                    </span>
                </div>

                {/* Owner Actions */}
                {isOwner && (
                    <div className="absolute top-3 right-3 flex space-x-2">
                        <Link 
                            to={`/edit-house/${house._id}`}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                        >
                            <FaEdit className="text-gray-600 text-sm" />
                        </Link>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(house._id);
                            }}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                        >
                            <FaTrash className="text-red-600 text-sm" />
                        </button>
                    </div>
                )}
            </div>

            {/* Content Section - Airbnb Style */}
            <div onClick={() => navigate(`/houses/${house._id}`)}>
                {/* Location and Rating */}
                <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center text-gray-600 text-sm">
                        <FaMapMarkerAlt className="text-gray-400 mr-1" />
                        <span className="truncate">{house.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm font-medium text-gray-900">{rating}</span>
                        <span className="text-sm text-gray-600">({reviewCount})</span>
                    </div>
                </div>

                {/* Title - Airbnb Style */}
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 text-base">
                    {house.title}
                </h3>

                {/* Price - Airbnb Style */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-semibold text-gray-900">
                            ETB {formatPrice(house.price)}
                        </p>
                        {house.type === 'Rent' && (
                            <p className="text-sm text-gray-600">per month</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;
