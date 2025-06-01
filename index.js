const app = require('./src/api/app');
const { sequelize } = require('./src/db/models/index');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.sync({ alter: true });  // Sync database before starting server
        console.log('✅ Database synced successfully.');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        // console.error('❌ Failed to sync database:', error);
        console.error('Error occurred when starting the server:', error);
        process.exit(1);
    }
}

startServer();