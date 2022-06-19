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

export const setRewiew = async ( user_id, lecture_id, rating, comment) => {
  const {data} = await $api.post('lecture-rewiew', { lecture_id, user_id, rating, comment})
  return data
}

export const updateLecture = async (lecture) => {
  const {data} = await $api.post('/lecture-update', lecture, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}