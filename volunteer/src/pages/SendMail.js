import React, { useState } from 'react';
import axios from 'axios';

const SendMail = () => {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5050/api/mail/send-email', { subject, text, html });
      alert('Emails sent successfully');
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error sending emails');
    }
  };

  return (
    <div>
      <h1>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label>
          <input 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Text:</label>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>HTML:</label>
          <textarea 
            value={html} 
            onChange={(e) => setHtml(e.target.value)} 
          />
        </div>
        <button type="submit">Send Emails</button>
      </form>
    </div>
  );
};

export default SendMail;