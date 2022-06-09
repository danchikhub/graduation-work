import $api from "../http";

export  const createLecture = async (lecture) => {
    
    const {data} = await $api.post('/lecture-create', lecture, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     })
    return data
}

export const deleteLecture = async (lecture_id) => {
  const {data} = await $api.post('/lecture-delete', {lecture_id})
  return data
}