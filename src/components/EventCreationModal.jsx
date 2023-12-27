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
    width: '70%',  // Adjust width as needed
    height: '80%', // Adjust height as needed
    overflow: 'auto', // Add scrollbars if content overflows
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
      setEventData(existingEventData); // Load existing event data for editing
    } else {
      setEventData({ title: '', description: '', dateTime: '', location: '', user: userId }); // Reset for new event creation
    }
  }, [isEditMode, existingEventData, userId]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const newEvent = await createEvent(eventData);
//     console.log('Event created:', newEvent);
//     // Logic to create the event
//     // After creating the event, you can close the modal:
//     closeModal();
//   };

// const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       let response;
//       if (isEditMode) {
//         response = await updateEvent(existingEventData._id, eventData);
//         console.log('Event updated:', response);
//       } else {
//         response = await createEvent({ ...eventData, user: userId });
//         console.log('Event created:', response);
//       }
//       onEventUpdated(response); // Call the callback function with the response
//       closeModal();
//     } catch (error) {
//       console.error('Error handling the event:', error);
//     }
//   };

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Since we're only creating new events, no need to check for isEditMode
      const response = await createEvent({ ...eventData, user: userId });
      console.log('Event created:', response);
      
      // Notify the parent component about the new event
    //   onEventUpdated(response);
      setShowSuccessMessage(true);
      console.log('ShowSuccessMessage:', showSuccessMessage);
      setTimeout(() => {
        closeModal();
        setShowSuccessMessage(false);
        window.location.reload();  // Reset the success message state
      }, 1000); // Close modal after 1 second
    } catch (error) {
      console.error('Error creating the event:', error);
    }
  };
  


//   const handleUpdate = async (event) => {
//     event.preventDefault();
//     try {
//       const updatedEvent = await updateEvent(existingEventData._id, eventData);
//       console.log('Event updated:', updatedEvent);
//       closeModal();
//     } catch (error) {
//       console.error('Error updating the event:', error);
//       // Handle errors appropriately
//     }
//   };

  return (
    <div className="modal">
         <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
      <form onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Edit Event' : 'Create Event'}</h2>
        {/* Event form inputs */}
        <input name="title" value={eventData.title} onChange={handleChange} placeholder="Title" />
        <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Description" />
        <input name="dateTime" type="datetime-local" value={eventData.dateTime} onChange={handleChange} />
        <input name="location" value={eventData.location} onChange={handleChange} placeholder="Location" />
        {showSuccessMessage && <p>Event {isEditMode ? 'Updated' : 'Created'} Successfully!</p>}
        <button type="submit">{isEditMode ? 'Edit' : 'Create'}</button>
        {/* <button type="submit">Create</button> */}
        <button onClick={closeModal}>Cancel</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default EventCreationModal;
