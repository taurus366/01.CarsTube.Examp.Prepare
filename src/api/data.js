import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getCars() {
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc');
}
export async function postCars(data) {
    return await api.post(host + '/data/cars',data);
}
// export await api.get()
export async function getCarById(id) {
    return await api.get(host + '/data/cars/' + id);
}
export async function editCar(id,data) {
    return await api.put(host + '/data/cars/' + id,data);
}
export async function deleteCar(id) {
    return await api.del(host + '/data/cars/' + id);
}
export async function getMyCars() {
    const userId = sessionStorage.getItem('userId');
    return api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function getCarByYear(year) {
    return await api.get(host + `/data/cars?where=year%3D${year}`)
}

// // Application -specific requests
// export async function getMemes() {
//     return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
// }
//
// export async function createMeme(meme) {
//     return await api.post(host + '/data/memes', meme);
// }
//
// export async function getMemeById(id) {
//     return await api.get(host + '/data/memes/' + id);
// }
//
// export async function editMeme(id, data) {
//     return await api.put(host + '/data/memes/' + id, data);
// }
//
// export async function deleteMeme(id) {
//     return await api.del(host +'/data/memes/' + id);
// }
// export async function getMyMeems() {
//     const userId = sessionStorage.getItem('userId');
//     return await api.get(host + `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
// }