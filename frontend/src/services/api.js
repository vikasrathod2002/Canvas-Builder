import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/canvas';

export const initializeCanvas = async (width, height) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/initialize`, { width, height });
    return response.data;
  } catch (error) {
    console.error('Error initializing canvas:', error);
    throw error;
  }
};

export const addRectangle = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rectangle`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding rectangle:', error);
    throw error;
  }
};

export const addCircle = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/circle`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding circle:', error);
    throw error;
  }
};

export const addText = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/text`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding text:', error);
    throw error;
  }
};

export const addImage = async (data) => {
  try {
    let response;
    if (data.imageFile) {
      const formData = new FormData();
      formData.append('image', data.imageFile);
      Object.keys(data).forEach(key => {
        if (key !== 'imageFile') formData.append(key, data[key]);
      });
      
      response = await axios.post(`${API_BASE_URL}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      response = await axios.post(`${API_BASE_URL}/image`, data);
    }
    return response.data;
  } catch (error) {
    console.error('Error adding image:', error);
    throw error;
  }
};

export const exportToPDF = () => {
  window.open(`${API_BASE_URL}/export`, '_blank');
};