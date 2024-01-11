// UserProfile.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Account = () => {
  // const { slug } = useParams(); // Access the slug from the URL

  // Use the slug to fetch user data or perform any actions based on the user's slug

  return (
    <div>
      <h2>User Profile</h2>
      <p>Current User Slug: </p>
      {/* Render user profile based on the slug */}
    </div>
  );
};

export default Account;