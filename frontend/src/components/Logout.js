import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth'; // Adjust the path as necessary

const Logout = () => {
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false); // Ref to track if logout has been performed

  useEffect(() => {
    const performLogout = async () => {
      if (hasLoggedOut.current) return; // If already logged out, do nothing
      hasLoggedOut.current = true; // Mark as logged out

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('https://localhost:7040/api/v1/auth/logout', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            removeToken();
            navigate('/');
          } else {
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Logout failed', error);
        }
      } else {
        navigate('/');
      }
    };

    performLogout();
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default Logout;