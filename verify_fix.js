try {
    require('./src/config/db.js');
    require('./src/models/user.model.js');
    require('./src/service/userService.js');
    require('./src/controllers/authController.js');
    require('./src/index.js');
    require('./src/routes/authRoutes.js')
    console.log("All modules required successfully");
} catch (error) {
    console.error("Error requiring modules:", error);
    process.exit(1);
}
