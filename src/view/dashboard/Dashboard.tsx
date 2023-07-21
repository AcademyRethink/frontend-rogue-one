import { useEffect, useState } from 'react';
import axios from '../../axios.config';
import React from 'react';
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await axios.get(
          'http://localhost:8080/dashboard/categories',
         { params: {
            cnpj: '00111222000133',
          },}
        );
        console.log(result);

        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    };
    fetchDashboardData();
  }, []);
  console.log('render');
  // Check if userData is available and user is logged in
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ margin: 'auto' }}>
        {/* Render your dashboard content here */}
      </div>
    );
  }

};

export default React.memo(Dashboard);
