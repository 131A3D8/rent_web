import request from '../utils/request';

export function get(params = {}) {
return request({
method: 'GET',
url: 'http://localhost:8080/renting/All',
params,
});
}

export function getProduct(id) {
return request({
method: 'GET',
url: '/products/${id}',
});
}

export function update(id, data) {
return request({
method: 'PUT',
url: `/products/${id}`,
data,
});
}