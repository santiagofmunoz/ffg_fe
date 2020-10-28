import axios from 'axios';

const API_URL = "http://localhost:8000"

class PlayerService {
    createPlayer(player) {
        const url = `${API_URL}/api/formation/create_player/`;
        return axios.post(url, player)
    }
}

export default PlayerService;