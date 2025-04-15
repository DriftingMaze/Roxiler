import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [userFilters, setUserFilters] = useState({
    name: '',
    email: '',
    role: 'all'
  });

  const [storeFilters, setStoreFilters] = useState({
    name: '',
    address: '',
    owner: ''
  });

  const [showUserModal, setShowUserModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [newStore, setNewStore] = useState({ name: '', address: '', ownerName: '', email: '', password: '' });

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const [userRes, storeRes, ratingRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/stores', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/ratings', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setUsers(userRes.data);
      setStores(storeRes.data);
      setRatings(ratingRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleUserFilterChange = (e) => {
    setUserFilters({ ...userFilters, [e.target.name]: e.target.value });
  };

  const handleStoreFilterChange = (e) => {
    setStoreFilters({ ...storeFilters, [e.target.name]: e.target.value });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userFilters.name.toLowerCase()) &&
    user.email.toLowerCase().includes(userFilters.email.toLowerCase()) &&
    (userFilters.role === 'all' || user.role === userFilters.role)
  );

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(storeFilters.name.toLowerCase()) &&
    store.address.toLowerCase().includes(storeFilters.address.toLowerCase()) &&
    (store.owner || '').toLowerCase().includes(storeFilters.owner.toLowerCase())
  );

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowUserModal(false);
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      fetchData();
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Failed to add user');
    }
  };

  const handleAddStore = async () => {
    try {
      const userRes = await axios.get(`http://localhost:5000/api/users?email=${newStore.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      let ownerId;
  
      if (userRes.data.length === 0) {
        const newOwner = {
          name: newStore.ownerName,
          email: newStore.email,
          password: newStore.password,
          role: 'owner'  
        };
  
        const userCreateRes = await axios.post('http://localhost:5000/api/users', newOwner, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        ownerId = userCreateRes.data.id;
      } else {
        ownerId = userRes.data[0].id;
      }
  
      const storeData = {
        name: newStore.name,
        address: newStore.address,
        ownerId: ownerId
      };
  
      await axios.post('http://localhost:5000/api/stores', storeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setShowStoreModal(false);
      setNewStore({ name: '', address: '', ownerName: '', email: '', password: '' });
      fetchData();
      alert('Store added successfully');
    } catch (err) {
      console.error('Error adding store:', err);
      alert('Failed to add store');
    }
  };

  return (
    <div className="dashboard-container">
     
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Users</h3>
          <div>{users.length}</div>
        </div>
        <div className="summary-card">
          <h3>Total Stores</h3>
          <div>{stores.length}</div>
        </div>
        <div className="summary-card">
          <h3>Total Ratings</h3>
          <div>{ratings.length}</div>
        </div>
      </div>

      <div className="section card">
        <div className="section-header">
          <h2>Users</h2>
          <button onClick={() => setShowUserModal(true)}>Add User</button>
        </div>
        <div className="filters">
          <input name="name" placeholder="Name" onChange={handleUserFilterChange} />
          <input name="email" placeholder="Email" onChange={handleUserFilterChange} />
          <select name="role" onChange={handleUserFilterChange} value={userFilters.role}>
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section card">
        <div className="section-header">
          <h2>Stores</h2>
          <button onClick={() => setShowStoreModal(true)}>Add Store</button>
        </div>
        <div className="filters">
          <input name="name" placeholder="Store Name" onChange={handleStoreFilterChange} />
          <input name="address" placeholder="Address" onChange={handleStoreFilterChange} />
          <input name="owner" placeholder="Owner Name" onChange={handleStoreFilterChange} />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Address</th>
              <th>Owner</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map(store => {
              const storeRatings = ratings.filter(r => r.storeId === store.id);
              const avgRating = storeRatings.length > 0
                ? (storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length).toFixed(1)
                : 'N/A';

              return (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.address}</td>
                  <td>{store.owner || 'N/A'}</td>
                  <td>{avgRating}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showUserModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add User</h3>
            <input placeholder="Name" onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
            <input placeholder="Email" onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
            <input placeholder="Password" type="password" onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
            <select onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
            <button onClick={handleAddUser}>Add</button>
            <button onClick={() => setShowUserModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showStoreModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Store</h3>
            <input placeholder="Store Name" onChange={e => setNewStore({ ...newStore, name: e.target.value })} />
            <input placeholder="Address" onChange={e => setNewStore({ ...newStore, address: e.target.value })} />
            <input placeholder="Owner Name" onChange={e => setNewStore({ ...newStore, ownerName: e.target.value })} />
            <input placeholder="Email" onChange={e => setNewStore({ ...newStore, email: e.target.value })} />
            <input placeholder="Password" type="password" onChange={e => setNewStore({ ...newStore, password: e.target.value })} />
            <button onClick={handleAddStore}>Add</button>
            <button onClick={() => setShowStoreModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
