import axios from 'axios';

const API_URL = "http://localhost:8000"

class FormationService {
    // Makes an API call to create a formation. The function receives a formation object as a parameter
    create_formation(formation) {
        const url = `${API_URL}/api/formation/create_formation/`;
        return axios.post(url, formation)
    }
    // Makes an API call to get all the formations in the system.
    get_formations() {
        const url = `${API_URL}/api/formation/get_formations/`;
        return axios.get(url)
    }

    // Makes an API call to export the desired formation as a PDF. The function receives the formation id as a parameter
    export_formation_as_pdf(formationId) {
        const url = `${API_URL}/api/formation/export_formation_as_pdf/${formationId}`;
        return axios.get(url, {responseType: 'blob'})
    }
}

export default FormationService;