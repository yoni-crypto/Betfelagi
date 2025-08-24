# Real Estate API Integration Guide

## 🏠 Get More Houses for Your HomeHive App

I've integrated external real estate APIs to give you access to thousands of properties! Here's how to set it up:

## 📋 Available APIs

### 1. **Realty Mole Property API** (Recommended)
- **Features**: Property listings, rental data, sale data, property details
- **Free Tier**: 100 requests/month
- **Data**: Real property data from multiple sources

### 2. **RentSpree API**
- **Features**: Rental properties, property management, tenant screening
- **Free Tier**: Available
- **Data**: Focused on rental properties

### 3. **ATTOM Data API**
- **Features**: Property valuations, market data, property history
- **Free Tier**: Limited
- **Data**: Comprehensive property analytics

## 🚀 Setup Instructions

### Step 1: Get RapidAPI Account
1. Go to [https://rapidapi.com/](https://rapidapi.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Subscribe to Realty Mole API
1. Search for "Realty Mole Property API" on RapidAPI
2. Click "Subscribe to Test"
3. Choose the free plan (100 requests/month)
4. Copy your API key

### Step 3: Configure Your App
1. Open `frontend/src/config/apiConfig.js`
2. Replace `YOUR_RAPIDAPI_KEY_HERE` with your actual API key:

```javascript
RAPIDAPI: {
    KEY: 'your-actual-api-key-here', // Replace this
    HOST: 'realty-mole-property-api.p.rapidapi.com',
    BASE_URL: 'https://realty-mole-property-api.p.rapidapi.com'
}
```

### Step 4: Test the Integration
1. Start your development server
2. Navigate to the home page
3. You should now see many more houses from the external API

## 🔧 Configuration Options

### Change Default City
In `apiConfig.js`, modify the default search:

```javascript
DEFAULT_SEARCH: {
    city: 'Los Angeles', // Change this
    state: 'CA',         // Change this
    limit: 50
}
```

### Switch Between APIs
You can easily switch between different APIs by modifying the `fetchExternalHouses` function in `Home.jsx`.

## 📊 What You'll Get

- **50+ properties** per search (configurable)
- **Real property data** with actual prices and details
- **High-quality images** from property listings
- **Accurate property information** (bedrooms, bathrooms, square footage)
- **Mixed listings** from your own API + external API

## 🎯 Features

- **Combined Results**: Your own listings + external API data
- **Smart Filtering**: Works with all your existing filters
- **Random Shuffling**: Properties are mixed for variety
- **Fallback Images**: Uses Unsplash images if property images aren't available
- **Error Handling**: Gracefully handles API failures

## 💡 Tips

1. **API Limits**: Free tier has 100 requests/month - use wisely
2. **Caching**: Consider implementing caching to reduce API calls
3. **Multiple Cities**: You can expand to search multiple cities
4. **Backup APIs**: Set up multiple APIs for redundancy

## 🔒 Security

- API keys are stored in the frontend (for demo purposes)
- For production, move API calls to your backend
- Use environment variables for API keys

## 🆘 Troubleshooting

### No External Houses Showing
- Check if API key is correctly configured
- Verify RapidAPI subscription is active
- Check browser console for errors

### API Rate Limits
- Free tier: 100 requests/month
- Upgrade to paid plan for more requests
- Implement request caching

### Data Format Issues
- External API data is transformed to match your format
- Check the transformation logic in `fetchExternalHouses`

## 🚀 Next Steps

1. **Get your API key** from RapidAPI
2. **Configure the API** in `apiConfig.js`
3. **Test the integration**
4. **Customize the search** for your preferred cities
5. **Consider upgrading** to paid plans for more data

Your app will now have access to thousands of real properties! 🎉
