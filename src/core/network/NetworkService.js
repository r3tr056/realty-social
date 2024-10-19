import axios from 'axios';
import { baseURL, headers } from './config';
import { resInterceptor } from './interceptors';

export class NetworkService {
    constructor() {
        this.client = axios.create({baseURL: baseURL, headers: headers});
        this.client.interceptors.response.use(resInterceptor.onFulfill, resInterceptor.onReject);
    }

    setAccessToken(token) {
        this.client.defaults.headers.common.authorization = `Bearer ${token}`;
    }

    clearAccessToken() {
        delete this.client.defaults.headers.common.authorization;
    }

    request({method, url, data, ...config}) {
        return this.client.request({method: method, url: url, data: data, ...config});
    }
}

export const networkService = new NetworkService;