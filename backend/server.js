import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { sequelize, User } from './models/index.js';
import bcrypt from 'bcryptjs';

const PORT = process.env.PORT || 5000;

const createDefaultAdmin = async () => {
  try {
    const email = process.env.DEFAULT_ADMIN_EMAIL;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;

    if (!email || !password) {
      console.warn('DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD not set in .env');
      return;
    }

    const existingAdmin = await User.findOne({ where: { role: 'admin' } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name: 'Admin',
        email,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`Admin user created! Email: ${email} / Password: ${password}`);
    } else {
      console.log(`An admin user already exists. No new admin created.`);
    }
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};

sequelize.sync().then(() => {
  createDefaultAdmin(); 

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
