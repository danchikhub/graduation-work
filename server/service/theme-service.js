const InstructorModel = require('../models/instructor-model');
const ThemeModel = require('../models/theme-model');
class ThemeService {
    async createTheme(course_id, theme_title, theme_desc, fileName) {
        const theme = await ThemeModel.create({
            theme_title:  theme_title,
            theme_file: fileName,
            theme_desc: theme_desc,
            course_id: course_id,
        })
        return theme
        
    }
}

module.exports = new ThemeService();