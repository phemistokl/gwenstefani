import axios from 'axios'
// import { apiPrefix } from '../etc/config.json'

export default {
    listFeatures() {
        return axios.get('http://localhost:3000/features');
    }
}