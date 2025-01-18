import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [userHouses, setUserHouses] = useState([]);

    useEffect(() => {
        const fetchUserHouses = async () => {
            try {
                const { data } = await axios.get(`https://betfelagi-api.vercel.app/api/users/${userId}/houses`);
                setUserDetails(data.user);
                setUserHouses(data.listings);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserHouses();
    }, [userId]);

    if (!userDetails) return <p>Loading...</p>;

    return (
        <div className="container p-4 mx-auto mt-8 py-8 max-w-6xl">
            <div className="text-center mb-8">
                {/* User Profile Section */}
                <div className="flex items-center justify-center mb-4">
                    <img
                        src={userDetails.profileImage || '/default-profile-icon.png'}
                        alt={userDetails.username}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                    />
                </div>
                <h1 className="text-xl sm:text-3xl font-bold">{userDetails.username}</h1>
                <p className="text-sm sm:text-lg text-gray-600">Phone: {userDetails.phoneNumber}</p>
                <p className="text-sm sm:text-lg text-gray-600">Email: {userDetails.email}</p>
            </div>

            {/* User Listings */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {userHouses.map((house) => (
                    <div key={house._id} className="relative bg-black overflow-hidden rounded-md shadow-lg">
                        <img
                            src={house.images[0]}
                            alt={house.title}
                            className="w-full h-40 sm:h-48 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                            <h2 className="text-xs sm:text-sm font-bold truncate">{house.title}</h2>
                            <p className="text-xs">{house.location}</p>
                        </div>
                        <Link to={`/houses/${house._id}`} className="absolute inset-0"></Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
