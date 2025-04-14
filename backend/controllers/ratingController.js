import { Rating } from '../models/index.js';

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