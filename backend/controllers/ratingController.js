import { Rating, Store, User } from '../models/index.js';

export const rateStore = async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;

  const [record, created] = await Rating.upsert({ storeId, userId, rating }, {
    returning: true
  });

  const storeRatings = await Rating.findAll({ where: { storeId } });
  const avg = (storeRatings.reduce((a, b) => a + b.rating, 0) / storeRatings.length).toFixed(1);

  res.status(200).json({ ...record.toJSON(), averageRating: avg });
};

export const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Store, attributes: ['id', 'name', 'address'] }
      ]
    });
    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ratings', error: err.message });
  }
};
