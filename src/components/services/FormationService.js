import axios from 'axios';

const API_URL = "http://localhost:8000"

class FormationService {
    create_formation(formation) {
        const url = `${API_URL}/api/formation/create_formation/`;
        return axios.post(url, formation)
    }

    get_formations() {
        const url = `${API_URL}/api/formation/get_formations/`;
        return axios.get(url)
    }

    export_formation_as_pdf(formationId) {
        const url = `${API_URL}/api/formation/export_formation_as_pdf/${formationId}`;
        return axios.get(url, {responseType: 'blob'})
    }
}

export default FormationService;