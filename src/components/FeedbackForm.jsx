import React, { useState } from 'react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || message.trim() === '') return;

    setSubmitted(true);
    // Очистка формы после отправки
    setName('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Feedback Form</h1>

      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
      />

      <button type="submit" disabled={name.trim() === '' || message.trim() === ''}>
        Submit
      </button>

      {submitted && <p role="alert">Feedback sent!</p>}
    </form>
  );
};

export default FeedbackForm;
