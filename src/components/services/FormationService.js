import axios from 'axios';

const API_URL = "http://localhost:8000"

class FormationService {
    create_formation(formation) {
        const url = `${API_URL}/api/formation/create_formation/`;
        return axios.post(url, formation)
    }
}

export default FormationService;