require('dotenv').config()
const UniversityModel = require('./models/university-model');
const LevelModel = require('./models/level-model');
const RoleModel = require('./models/role-model');
const CategoryModel = require('./models/category-model');
const CourseModel = require('./models/course-model')
const express = require('express');
const CourseRating = require('./models/courseRating-model');
const sequelize = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const router = require('./routes/index');
const errorMiddleware = require('./middleware/error-middleware');
const app = express();
const CourseService = require('./service/course-service');
const path = require('path')

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;




const start = async () => {
    try {
         
        
        await sequelize.authenticate();
        await sequelize.sync();
       
        app.listen(PORT, () => console.log(`Server started  on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();

