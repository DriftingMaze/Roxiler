import { Store, Rating, User } from '../models/index.js';

export const getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        {
          model: User, 
          attributes: ['name'] 
        },
        {
          model: Rating,  
          attributes: ['rating', 'userId'],  
        }
      ]
    });

    const userId = req.user.id; 

    const storeData = stores.map(store => {
      const ratings = store.Ratings.map(r => r.rating);
      const avgRating = ratings.length
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : 'No ratings yet';

      const userRatingObj = store.Ratings.find(r => r.userId === userId);
      const userRating = userRatingObj ? userRatingObj.rating : null;

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        owner: store.User?.name || 'Unknown',  
        avgRating,
        userRating,  
      };
    });

    res.status(200).json(storeData);  
  } catch (err) {
    console.error('Error fetching store ratings:', err);
    res.status(500).json({ message: 'Failed to fetch store ratings' });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, address, ownerId } = req.body;

    if (!name || !address || !ownerId) {
      return res.status(400).json({ message: 'All fields are required to create a store.' });
    }

    const store = await Store.create({
      name,
      address,
      ownerId  
    });

    res.status(201).json(store); 
  } catch (err) {
    console.error('Error creating store:', err);
    res.status(500).json({ message: 'Failed to create store' });
  }
};

export const getStoreByOwner = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await Store.findOne({
      where: { ownerId },
      include: [
        {
          model: Rating,
          include: [
            {
              model: User,
              attributes: ['id', 'email']  
            }
          ]
        }
      ]
    });

    if (!store) {
      return res.status(404).json({ message: 'No store found for this owner' });
    }

    const ratings = store.Ratings.map(r => ({
      rating: r.rating,
      user: r.User
    }));

    res.status(200).json({ store: { id: store.id, name: store.name }, ratings });
  } catch (err) {
    console.error('Error fetching store for owner:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
