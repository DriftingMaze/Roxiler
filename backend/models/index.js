import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import UserDef from './user.js';
import StoreDef from './store.js';
import RatingDef from './rating.js';

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false
});

const User = UserDef(sequelize);
const Store = StoreDef(sequelize);
const Rating = RatingDef(sequelize);

User.hasMany(Rating);
Rating.belongsTo(User);

Store.hasMany(Rating);
Rating.belongsTo(Store);

Store.belongsTo(User, { foreignKey: 'ownerId' });

export { sequelize, User, Store, Rating };
