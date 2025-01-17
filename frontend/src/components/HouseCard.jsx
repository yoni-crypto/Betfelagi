// HouseCard Component
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import { AuthContext } from '../context/authContext';

const HouseCard = ({ house, onDelete }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const isForSale = house.type === 'Sell';
    const isOwner = user && house.user && house.user._id === user._id;

    return (
        <div
            className="relative bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-gray-200"
        >
            {/* Image Section */}
            <div
                onClick={() => navigate(`/houses/${house._id}`)}
                className="cursor-pointer"
            >
                {house.images && house.images.length > 0 ? (
                    <img
                        src={house.images[0]}
                        alt={house.title}
                        className="w-full h-52 object-cover"
                    />
                ) : (
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-500">
                        <p>No image available</p>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4">
                <h3 className="text-md font-bold text-gray-800 truncate">
                    {house.title}
                </h3>
                <p className="text-gray-500 text-sm flex items-center mt-1">
                    <FaMapMarkerAlt className="text-red-600 mr-1" size={14} />
                    {house.location}
                </p>
                <p className="text-blue-600 font-bold text-lg mt-2">
                    ${house.price}
                    {!isForSale && <span className="text-sm text-gray-500">/month</span>}
                </p>
                <div className="text-gray-600 text-sm mt-2">
                    Type: <span className="font-medium">{house.type}</span>
                </div>

                {/* Owner Actions */}
                {isOwner && (
                    <div className="flex justify-end space-x-4 mt-4">
                        <Link to={`/edit-house/${house._id}`}>
                            <FaEdit className="text-blue-600 hover:text-blue-800" size={20} />
                        </Link>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(house._id);
                            }}
                        >
                            <FaTrash className="text-red-600 hover:text-red-800" size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HouseCard;
