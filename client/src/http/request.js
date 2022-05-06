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