import { DataTypes } from 'sequelize';

const Store = (sequelize) => {
  return sequelize.define('Store', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(60), allowNull: false },
    address: { type: DataTypes.STRING(400), allowNull: false },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
  });
};

export default Store;
