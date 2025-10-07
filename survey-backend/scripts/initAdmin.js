require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function initAdmin() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ 数据库连接成功');

    // 检查是否已存在管理员
    const existingAdmin = await Admin.findOne({ 
      username: process.env.ADMIN_USERNAME || 'admin' 
    });

    if (existingAdmin) {
      console.log('⚠️  管理员账号已存在');
      console.log('用户名:', existingAdmin.username);
      
      // 询问是否重置密码
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      readline.question('是否重置密码? (y/n): ', async (answer) => {
        if (answer.toLowerCase() === 'y') {
          existingAdmin.password = process.env.ADMIN_PASSWORD || 'admin123456';
          await existingAdmin.save();
          console.log('✅ 密码已重置');
        }
        readline.close();
        mongoose.connection.close();
      });
    } else {
      // 创建新管理员
      const admin = new Admin({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123456',
        role: 'superadmin'
      });

      await admin.save();

      console.log('✅ 管理员账号创建成功！');
      console.log('==========================================');
      console.log('用户名:', admin.username);
      console.log('密码:', process.env.ADMIN_PASSWORD || 'admin123456');
      console.log('==========================================');
      console.log('⚠️  请立即修改默认密码！');

      mongoose.connection.close();
    }
  } catch (error) {
    console.error('❌ 初始化失败:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

initAdmin();