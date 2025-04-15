import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [newRating, setNewRating] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stores', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStores(res.data);
        setFilteredStores(res.data);
      } catch (err) {
        console.error('Error fetching stores', err);
      }
    };
    fetchStores();
  }, [token]);

  useEffect(() => {
    const filtered = stores.filter((store) => {
      const nameMatch = store.name.toLowerCase().includes(nameFilter.toLowerCase());
      const addressMatch = store.address.toLowerCase().includes(addressFilter.toLowerCase());
      const ownerMatch = (store.owner || '').toLowerCase().includes(ownerFilter.toLowerCase());
      return nameMatch && addressMatch && ownerMatch;
    });
    setFilteredStores(filtered);
  }, [nameFilter, addressFilter, ownerFilter, stores]);

  const handleRateClick = (store) => {
    setSelectedStore(store);
    setNewRating(store.userRating?.toString() || '');
  };

  const handleSubmitRating = async () => {
    if (!selectedStore || !newRating) return;

    try {
      await axios.post(
        `http://localhost:5000/api/stores/${selectedStore.id}/rate`,
        { rating: Number(newRating) },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const updatedStores = stores.map((store) =>
        store.id === selectedStore.id
          ? { ...store, userRating: Number(newRating) }
          : store
      );

      setStores(updatedStores);
      setFilteredStores(updatedStores);
      setSelectedStore(null);
      setNewRating('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="section">
        <div className="section-header">
          <h2>Stores</h2>
        </div>

        <div className="filters">
          <input type="text" placeholder="Search by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
          <input type="text" placeholder="Search by Address" value={addressFilter} onChange={(e) => setAddressFilter(e.target.value)} />
          <input type="text" placeholder="Search by Owner" value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)} />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Address</th>
              <th>Owner</th>
              <th>Overall Rating</th>
              <th>Your Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>{store.owner}</td>
                <td>{store.avgRating || '-'}</td>
                <td>
                  {store.userRating ? (
                    <>
                      {store.userRating}
                      <button className="edit-btn" onClick={() => handleRateClick(store)}>Edit</button>
                    </>
                  ) : (
                    <button className="rate-btn" onClick={() => handleRateClick(store)}>Rate</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStore && (
        <div className="modal">
          <div className="modal-content">
            <h3>Rate Store: {selectedStore.name}</h3>
            <p>Give a rating from 1 to 5:</p>
            <input
              type="number"
              min="1"
              max="5"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleSubmitRating}>Submit</button>
              <button onClick={() => setSelectedStore(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
