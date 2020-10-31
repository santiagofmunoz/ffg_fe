import React from 'react';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";

function PlayersSelect(props) {
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
                                  value={element.player_id}>
                            {element.player_first_name} {element.player_last_name} - {element.position.position_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default PlayersSelect;