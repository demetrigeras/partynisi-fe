import React, { useState, useEffect} from 'react';
import {createEvent} from '../services/event.js'

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };
  

  const modalContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    width: '70%',  
    height: '70%', 
    overflow: 'auto', 
  };



const EventCreationModal = ({ closeModal, isEditMode, existingEventData, userId, onEventUpdated }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    dateTime: '',
    location: '',
    userId: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (isEditMode && existingEventData) {
      setEventData(existingEventData); 
    } else {
      setEventData({ title: '', description: '', dateTime: '', location: '', user: userId }); 
    }
  }, [isEditMode, existingEventData, userId]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createEvent({ ...eventData, user: userId });
      console.log('Event created:', response);
      setShowSuccessMessage(true);
      console.log('ShowSuccessMessage:', showSuccessMessage);
      setTimeout(() => {
        closeModal();
        setShowSuccessMessage(false);
        window.location.reload();  
      }, 1000); 
    } catch (error) {
      console.error('Error creating the event:', error);
    }
  };

  return (
    <div className="modal">
         <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
      <form onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Edit Event' : 'Create Event'}</h2>
        <input name="title" value={eventData.title} onChange={handleChange} placeholder="Title" />
        <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Description" />
        <input name="dateTime" type="datetime-local" value={eventData.dateTime} onChange={handleChange} />
        <input name="location" value={eventData.location} onChange={handleChange} placeholder="Location" />
        {showSuccessMessage && <p>Event {isEditMode ? 'Updated' : 'Created'} Successfully!</p>}
        <div className="button-container">
        <button className='createEditEventbuttonmodal' type="submit">{isEditMode ? 'Edit' : 'Create'}</button>
        {/* <button type="submit">Create</button> */}
        <button className='cancelbutton' onClick={closeModal}>Cancel</button>
        </div> 
      </form>
    </div>
    </div>
    </div>
  );
};

export default EventCreationModal;
