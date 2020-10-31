import axios from 'axios';

const API_URL = "http://localhost:8000"

class PlayerService {
    createPlayer(player) {
        const url = `${API_URL}/api/formation/create_player/`;
        return axios.post(url, player);
    }

    get_players_position_detail() {
        const url = `${API_URL}/api/formation/get_players_position_detail/`;
        return axios.get(url);
    }
}

export default PlayerService;