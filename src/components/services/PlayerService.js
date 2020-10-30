import axios from 'axios';

const API_URL = "http://localhost:8000"

class PlayerService {
    createPlayer(player) {
        const url = `${API_URL}/api/formation/create_player/`;
        return axios.post(url, player);
    }

    get_players_by_position_type(position_type) {
        const url = `${API_URL}/api/formation/get_players_by_position_type/${position_type}`;
        return axios.get(url);
    }
}

export default PlayerService;