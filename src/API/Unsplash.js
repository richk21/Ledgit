import axios from 'axios';

const API_KEY = "PLG5nOQtnlRtLA1M8R2S_dLWRPmh-5joSDDu4sAtPu4" //process.env.UNSPLASH_ACCESS_KEY;

const fetchImages = async (keyword, count=20) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: { 
        client_id: API_KEY,
        query:keyword,
        count:count,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export default fetchImages;
