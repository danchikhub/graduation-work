import $api from "../http";

// export default class CourseService {
//     static async createCourse(course) {
//          const {data} = await $api.post('/course-create', course, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//          return data
//     }
// }

export  const createCourse = async (course) => {
    
    const {data} = await $api.post('/course-create', course, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     })
    return data
}

export  const createTheme = async (theme) => {
    
  const {data} = await $api.post('/theme-create', theme, {
     headers: {
       "Content-Type": "multipart/form-data",
     },
   })
  return data
}

