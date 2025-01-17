import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const { userId } = useParams();
    const [userHouses, setUserHouses] = useState([]);

    useEffect(() => {
        const fetchUserHouses = async () => {
            try {
                const { data } = await axios.get(`https://betfelagi-api.vercel.app/api/users/${userId}/houses`);
                setUserHouses(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserHouses();
    }, [userId]);

    if (userHouses.length === 0) return <p>Loading...</p>;

    return (
        <div className="container mx-auto mt-16 py-8 max-w-6xl">
            <h1 className="text-2xl font-bold">Listings by {userHouses[0].user.username}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {userHouses.map((house) => (
                    <div key={house._id} className="bg-white p-4 shadow-md rounded-md">
                        <img src={house.images[0]} alt={house.title} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="text-lg font-bold mt-2">{house.title}</h2>
                        <p>{house.location}</p>
                        <Link to={`/houses/${house._id}`} className="text-blue-600 mt-2 inline-block">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
