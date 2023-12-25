import api from './apiConfig.js'

export const getEvents = async () => {
  try {
    const response = await api.get("/event");
    return response.data;
  } catch (error) {
    console.error(`Failed to get pledges - error: ${error}`);
    throw error;
  }
};

export const getEventsByUser = async (userId) => {
  try {
    const response = await api.get(`/event/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEvent = async (id) => {
    try {
      const response = await api.get(`/event/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get event- error: ${error}`);
      throw error;
    }
  };


export const createEvent = async (event) => {
    try {
      const response = await api.post("/event", event);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateEvent = async (id, update) => {
    try {
      const response = await api.put(`/event/${id}`, update);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteEvent = async (id) => {
    try {
      const response = await api.delete(`/event/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };