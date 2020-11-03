import React from 'react';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";

/*
    Component to create every select in CreateFormation depending on the player type.
    Props needed: formControl, playerNum, playerType, setPlayerValue, playersList, selectedPlayersList
 */
function PlayersSelect(props) {

    // TODO: Optimise this piece of code. It lacks of the validation of no repetition of position.
    const checkSelectedPlayers = (player_id) => {
        // Selected Players List
        const spl = props.selectedPlayersList
        /*
            For every player selected, we check if the player id has been selected, and if it has, we disable the
            option in every select.
         */
        for(let splElement in spl) {
            if(player_id === spl[splElement]) {
                return true
            }
        }
    }

    return (
        <Grid item xs={12}>
            <FormControl required variant="outlined" className={props.formControl}>
                <InputLabel id={props.playerNum + "-label"}>{props.playerType}</InputLabel>
                <Select
                    labelId={props.playerNum + "-label"}
                    id={props.playerType + props.playerNum}
                    name={"player" + props.playerNum}
                    onChange={e => props.setPlayerValue(prevState => ({...prevState, [e.target.name]: e.target.value}))}
                    label={props.playerType}
                >
                    <MenuItem key="default" value="default" disabled>
                        Seleccione una opción
                    </MenuItem>
                    {props.playersList.map(element => (
                        <MenuItem key={element.player_id}
                                  value={element.player_id}
                                  disabled={checkSelectedPlayers(element.player_id)}
                        >
                            {element.player_first_name} {element.player_last_name} - {element.position.position_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default PlayersSelect;