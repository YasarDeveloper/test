import React from 'react';
import axios from 'axios';

const linkedInClientId = '860a7kmprfcphv';
const redirectUri = 'http://localhost:3001/';   

const App = () => {
  const handleLinkedInLogin = () => {
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInClientId}&redirect_uri=${redirectUri}&state=foobar&scope=profile`
    window.location.href = linkedInAuthUrl;
  };

  const handleLinkedInCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      try {
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
          params: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: linkedInClientId,
            client_secret: 'amyVz9oga5e6EgHu',
          },
        });

        const { access_token } = response.data;
        const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        console.log(profileResponse.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    handleLinkedInCallback();
  }, []);

  return (
    <div>
      <button onClick={handleLinkedInLogin}>Login with LinkedIn</button>
    </div>
  );
};

export default App;
