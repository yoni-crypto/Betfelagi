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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userHouses.map((house) => (
                    <div key={house._id} className="bg-white p-4 shadow-md rounded-md">
                        <img src={house.images[0]} alt={house.title} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="text-lg font-bold mt-2 truncate" title={house.title}>
                            {house.title}
                        </h2>
                        <p>{house.location}</p>
                        <Link to={`/houses/${house._id}`} className="text-blue-600 mt-2 inline-block">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
