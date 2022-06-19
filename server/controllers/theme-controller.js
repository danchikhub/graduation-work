const uuid = require('uuid');
const path = require('path');
const ThemeService = require('../service/theme-service');
const themeService = require('../service/theme-service');
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
    async getThemes(req, res, next) {
        try {
            const {course_id} = req.query;
            const themes = await themeService.getThemes(course_id)
            return res.json(themes)
        } catch (error) {
            next(error)
        }
    }
    async updateTheme(req, res, next) {
        try {

            console.log(req.body)
            if(req.files === null) {
                const {theme_title, theme_desc, theme_id, theme_file} = req.body;
                const theme = await  ThemeService.updateTheme(theme_title, theme_desc,theme_file, theme_id)
                return res.json(theme)
            }else {
                const {theme_id, theme_title, theme_desc} = req.body;
            
            
                const { theme_file } = req.files;
                
                 let fileName = uuid.v4() + '.pdf';
                 theme_file.mv(path.resolve(__dirname, '..', 'static', fileName))
                 const theme = await  ThemeService.updateTheme(theme_title, theme_desc, fileName, theme_id)
                
               return res.json(theme)
            }
            
        } catch (error) {
            next(error)
        }
    }

    async deleteTheme(req, res, next) {
        try {
            const {theme_id} = req.body
            const theme = await ThemeService.deleteTheme(theme_id)
            return res.json(theme)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ThemeController()