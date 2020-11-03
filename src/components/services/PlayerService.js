import axios from 'axios';

const API_URL = "http://localhost:8000"

class PlayerService {
    // Makes an API call and creates a player. The function receives a player object as a parameter.
    createPlayer(player) {
        const url = `${API_URL}/api/formation/create_player/`;
        return axios.post(url, player);
    }

    // Makes an API call and gets all the players in the system with detail in their position.
    get_players_position_detail() {
        const url = `${API_URL}/api/formation/get_players_position_detail/`;
        return axios.get(url);
    }
}

export default PlayerService;