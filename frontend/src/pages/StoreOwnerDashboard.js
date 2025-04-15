import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StoreOwnerDashboard.css';

const StoreOwnerDashboard = () => {
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOwnerStoreAndRatings = async () => {
      try {
        const storeRes = await axios.get('http://localhost:5000/api/stores/owner', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setStore(storeRes.data.store);
        setRatings(storeRes.data.ratings);

        if (storeRes.data.ratings.length > 0) {
          const total = storeRes.data.ratings.reduce((sum, r) => sum + r.rating, 0);
          const avg = (total / storeRes.data.ratings.length).toFixed(1);
          setAverageRating(avg);
        } else {
          setAverageRating('No ratings yet');
        }
      } catch (err) {
        console.error('Error fetching owner store data:', err);
      }
    };

    fetchOwnerStoreAndRatings();
  }, [token]);

  return (
    <div className="dashboard-container">
      {store ? (
        <>
          <h2>{store.name}</h2>
          <p className="average-rating">Average Rating: {averageRating}</p>

          <table className="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((r, index) => (
                <tr key={index}>
                  <td>{r.user.id}</td>
                  <td>{r.user.email}</td>
                  <td>{r.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading your store information...</p>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
