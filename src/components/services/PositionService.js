import axios from 'axios';

const API_URL = "http://localhost:8000"

class PositionService {
    get_positions() {
        const url = `${API_URL}/api/formation/get_positions/`;
        return axios.get(url)
    }
}

export default PositionService;