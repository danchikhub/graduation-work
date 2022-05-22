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
export const updateCourse = async (course) => {
    const {data} = await $api.post('/course-update', course, {
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

export const updateTheme = async (theme) => {
  const {data} = await $api.post('/theme-update', theme, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}

export const deleteTheme = async (theme_id) => {
  const {data} = await $api.post('/theme-delete', {theme_id})
  return data
}

export const deleteCourse = async (course_id) => {
  const {data} = await $api.post('course-delete', {course_id})
  return data
}
export const setRewiew = async ( user_id, course_id, rating, comment) => {
  const {data} = await $api.post('course-rewiew', { course_id,user_id, rating, comment})
  return data
}

