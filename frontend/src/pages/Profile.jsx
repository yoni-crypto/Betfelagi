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
        <div className="container mx-auto mt-16 py-8 max-w-6xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">{userDetails.username}'s Listings</h1>
                <p className="text-lg text-gray-600">Phone: {userDetails.phoneNumber}</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                {userHouses.map((house) => (
                    <div key={house._id} className="relative bg-black overflow-hidden">
                        <img src={house.images[0]} alt={house.title} className="w-full h-48 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                            <h2 className="text-sm font-bold truncate">{house.title}</h2>
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
