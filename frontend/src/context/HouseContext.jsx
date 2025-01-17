import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const HouseContext = createContext();

export const HouseProvider = ({ children }) => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const { data } = await axios.get('https://betfelagi-api.vercel.app/api/houses');
                setHouses(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };

        fetchHouses();
    }, []);

    return (
        <HouseContext.Provider value={{ houses, loading }}>
            {children}
        </HouseContext.Provider>
    );
};
