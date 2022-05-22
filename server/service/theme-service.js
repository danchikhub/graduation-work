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
    async getThemes(course_id) {
        const themes = await ThemeModel.findAll({
            where: {course_id: course_id}
        })
        return themes;
    }
    async updateTheme(theme_title, theme_desc,fileName, theme_id) {
        const theme = await ThemeModel.update({
            theme_title: theme_title,
            theme_desc: theme_desc,
            theme_file: fileName
        }, {
            where: {id: theme_id}
        })
        return theme
    }
    async deleteTheme(theme_id) {
        const theme = await ThemeModel.destroy({
            where: {id: theme_id}
        })
        return theme
    }
}

module.exports = new ThemeService();