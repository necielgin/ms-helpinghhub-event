import NodeGeocoder from 'node-geocoder';

const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY, // for Mapquest, OpenCage, APlace, Google Premier
    formatter: null // 'gpx', 'string', ...
  }

const geocoder = NodeGeocoder(options);

export const geoCoderAddress = async (address) => {
    try {
        const data = await geocoder.geocode(address);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};