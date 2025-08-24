const mongoose = require('mongoose');
require('dotenv').config();

const House = require('../models/House');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const generateSampleHouses = () => {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    const neighborhoods = ['Downtown', 'Midtown', 'Uptown', 'Westside', 'Eastside', 'Northside', 'Southside', 'Central', 'Riverside', 'Hillside'];
    const propertyTypes = ['Apartment', 'Villa', 'Normal House', 'Commercial', 'Condominium'];
    const listingTypes = ['Rent', 'Sell'];
    
    const sampleHouses = [];
    
    for (let i = 1; i <= 100; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
        const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
        const listingType = listingTypes[Math.floor(Math.random() * listingTypes.length)];
        
        let basePrice;
        if (listingType === 'Rent') {
            basePrice = Math.floor(Math.random() * 3000) + 800;
        } else {
            basePrice = Math.floor(Math.random() * 800000) + 200000;
        }
        
        const bedrooms = Math.floor(Math.random() * 4) + 1;
        const bathrooms = Math.floor(Math.random() * 3) + 1;
        const area = Math.floor(Math.random() * 2000) + 500;
        
        const imageUrls = [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
            'https://images.unsplash.com/photo-1560448075-bb485b067938?w=400',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
            'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
            'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400',
            'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400',
            'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400',
            'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
            'https://images.unsplash.com/photo-1560448075-bb485b067938?w=400',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400'
        ];
        
        const shuffledImages = imageUrls.sort(() => 0.5 - Math.random());
        const randomImages = shuffledImages.slice(0, 4);
        
        const house = {
            title: `${bedrooms} Bedroom ${propertyType} in ${neighborhood}`,
            description: `Beautiful ${propertyType.toLowerCase()} located in the heart of ${neighborhood}, ${city}. This ${bedrooms}-bedroom, ${bathrooms}-bathroom property features modern amenities, spacious rooms, and a prime location. Perfect for ${listingType === 'Rent' ? 'renting' : 'buying'}!`,
            price: basePrice,
            location: `${neighborhood}, ${city}`,
            images: randomImages,
            type: listingType,
            category: propertyType,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            area: area,
            user: '6788f3897e03cf96a61e6262',
            isExternalListing: true,
            externalId: `sample_${i}_${Date.now()}`
        };
        
        sampleHouses.push(house);
    }
    
    return sampleHouses;
};

const saveHousesToDB = async (houses) => {
    try {
        console.log('Saving houses to database...');
        
        const existingHouses = await House.find({ isExternalListing: true });
        console.log(`Found ${existingHouses.length} existing external houses`);
        
        if (existingHouses.length > 0) {
            await House.deleteMany({ isExternalListing: true });
            console.log('Deleted existing external houses');
        }
        
        const savedHouses = await House.insertMany(houses);
        
        console.log(`Successfully saved ${savedHouses.length} houses to database`);
        return savedHouses;
    } catch (error) {
        console.error('Error saving houses to database:', error);
        throw error;
    }
};

const main = async () => {
    try {
        console.log('Starting sample house data generation...');
        
        await connectDB();
        
        console.log('Generating 100 diverse sample houses...');
        const sampleHouses = generateSampleHouses();
        
        console.log(`Generated ${sampleHouses.length} sample houses`);
        
        await saveHousesToDB(sampleHouses);
        
        console.log('Sample house data generation completed successfully!');
        
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        
    } catch (error) {
        console.error('Error in main function:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    main();
}

module.exports = { generateSampleHouses, saveHousesToDB };
