const uuid = require('uuid');
const path = require('path');
const ThemeService = require('../service/theme-service');
class ThemeController {
    async createTheme(req, res, next) {
        try {
            console.log(req.body)
            const {course_id, theme_title, theme_desc} = req.body;
             const { theme_file } = req.files;
            
             let fileName = uuid.v4() + '.pdf';
             theme_file.mv(path.resolve(__dirname, '..', 'static', fileName))
            const theme = await  ThemeService.createTheme(course_id, theme_title, theme_desc, fileName)
            return res.json(theme)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ThemeController()