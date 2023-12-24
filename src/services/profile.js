import api from "./apiConfig.js";

export const getProfiles = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    console.error(`Failed to get pledges - error: ${error}`);
    throw error;
  }
};

export const getProfile = async (id) => {
    try {
      const response = await api.get(`/profile/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get charity - error: ${error}`);
      throw error;
    }
  }

export const createProfile = async (profile) => {
    try {
      const response = await api.post("/profile", profile);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateProfile = async (id, update) => {
    try {
      const response = await api.put(`/profile/${id}`, update);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteProfile = async (id) => {
    try {
      const response = await api.delete(`/profile/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };