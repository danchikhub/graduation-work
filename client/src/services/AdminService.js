import $api from "../http";
export const createCategory = async (category_name) => {
    const {data} = await $api.post('/category-create', {category_name})
    return data
}

export const deleteCategory = async (category_id) => {
    const {data} = await $api.post('/category-delete', {category_id})
    return data
}

export const updateCategory = async (category_id, category_name) => {
    const {data} = await $api.post('/category-update', {category_id, category_name})
    return data
}


export const fetchUniversAdmin = async () => {
    const {data} = await $api.get('/univers-admin')
    return data
}


export const createUniver = async (univer_name, level_id) => {
    const {data} = await $api.post('/univer-create', {univer_name, level_id})
    return data
}

export const deleteUniver = async (univer_id) => {
    const {data} = await $api.post('/univer-delete', {univer_id})
    return data
}

export const updateUniver = async (univer_id, univer_name) => {
    const {data} = await $api.post('/univer-update', {univer_id, univer_name})
    return data
}



export const createLevel = async (level_name) => {
    const {data} = await $api.post('/level-create', {level_name})
    return data
}

export const updateLevel = async (level_name, level_id) => {
    const {data} = await $api.post('/level-update', {level_name, level_id})
    return data
}

export const deleteLevel = async (level_id) => {
    const {data} = await $api.post('/level-delete', {level_id})
    return data
}