import { Store, Rating, User } from '../models/index.js';

export const getStores = async (req, res) => {
  const stores = await Store.findAll({
    include: {
      model: Rating,
      attributes: ['rating']
    }
  });

  const storeWithAvg = stores.map((store) => {
    const ratings = store.Ratings.map(r => r.rating);
    const averageRating = ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null;

    return {
      ...store.toJSON(),
      averageRating
    };
  });

  res.json(storeWithAvg);
};

export const createStore = async (req, res) => {
  const store = await Store.create(req.body);
  res.status(201).json(store);
};
