import $api from "./index";

export const fetchLevels = async () => {
    const {data} = await $api.get('/levels');
    return data
}

export const fetchUnivers = async () => {
    const {data} = await $api.get('/univers');
    return data
}

export const fetchCategories = async () => {
    const {data} = await $api.get('/categories');
    return data
}

export const fetchCourses = async (categoryId, univerId) => {
    const {data} = await $api.get('/courses', {params: {
        categoryId, univerId
    }});
    
    return data
}

export const fetchCoursesSearch = async (searchWord) => {
    const {data} = await $api.get('/courses-search', {params: {
        searchWord
    }});
    
    return data
}

export const fetchCoursesPanel = async (instructor) => {
    
     const {data} = await $api.get('/course-panel', {params: {
         instructor
     }});
    
     return data
}

export const fetchCourseOneEdit = async (id) => {
    const {data} = await $api.get('/course-edit', {params: {
        id
    }})
    return data
}
export const fetchCourse = async (id) => {
    const {data} = await $api.get('/course', {params: {
        id
    }})
    return data
}
export const fetchThemes = async (course_id) => {
    const {data} = await $api.get('/themes', {
        params: {
            course_id
        }
    })
    return data
}

export const fetchUniversRating = async () => {
    const {data} = await $api.get('/univers-rating');
    return data
}

export const fetchLecturesPanel = async (instructor) => {
    
    const {data} = await $api.get('/lecture-panel', {params: {
        instructor
    }});
   
    return data
}

export const fetchLecture = async (id) => {
    const {data} = await $api.get('/lecture-get', {params: {
        id
    }})
    return data
}

export const fetchLectures = async (categoryId, univerId) => {
    const {data} = await $api.get('/lectures', {params: {
        categoryId, univerId
    }})
    return data
}

export const fetchLectureForPage = async (id) => {
    const {data} = await $api.get('/lecture', {params: {
        id
    }})
    return data
}

export const fetchLecturesSearch = async (searchWord) => {
    const {data} = await $api.get('/lectures-search', {params: {
        searchWord
    }});
    
    return data
}


export const fetchUsers = async () => {
    const {data} = await $api.get('/users')
    return data
}

export const deleteUser = async (user_id) => {
    const {data} = await $api.post('/user-delete', {user_id})
    return data
}

export const fetchCourseRewiew = async ( course_id) => {
    const {data} = await $api.get('/rewiew-getcourse', {params: {
        course_id
    }})
    return data
}

export const fetchLectureRewiew = async ( lecture_id) => {
    const {data} = await $api.get('/rewiew-getlecture', {params: {
        lecture_id
    }})
    return data
}