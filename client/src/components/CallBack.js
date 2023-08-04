import React, { useEffect } from 'react';
import { useHistory } from 'react';
import axios from 'axios';

const CallBack = () => {
    const history = useHistory();
    console.log(history)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Exchange the code for an access token
      axios
        .post('http://localhost:5000/auth/google/callback', { code })
        .then((response) => {
          // Save the access token in local storage or context state
          const accessToken = response.data.access_token;
          localStorage.setItem('access_token', accessToken);
          history.push('/dashboard'); // Redirect to the dashboard page after successful login
        })
        .catch((error) => {
          console.log(error);
          history.push('/login'); // Redirect back to the login page on error
        });
    } else {
      history.push('/login'); // Redirect back to the login page if the code is missing
    }
  }, [history]);

  return <div>Loading...</div>;
};

export default CallBack;
