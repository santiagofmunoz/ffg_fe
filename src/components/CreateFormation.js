import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Container, createMuiTheme,
    FormControl,
    Grid,
    InputLabel,
    MenuItem, MuiThemeProvider,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import FormationService from "./services/FormationService";
import GenericFunctions from "./GenericFunctions";
import PlayerService from "./services/PlayerService";
import PlayersSelect from "./PlayersSelect";

const formationService = new FormationService();
const genericFunctions = new GenericFunctions();
const playerService = new PlayerService();

// CSS Styles for the page
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    formControl: {
        minWidth: '100%',
    },
}));

// CSS for the submit button
const submitButton = createMuiTheme({
    palette: {
        primary: {500: "#245b80"}
    },
})

function CreateFormation() {
    // Instance to use the styles
    const classes = useStyles();
    // State to save the formation name
    const [formationName, setFormationName] = useState("");
    // State to save the number of defenders
    const [numDefenders, setNumDefenders] = useState(0);
    // State to save the number of midfielders
    const [numMidfielders, setNumMidfielders] = useState(0);
    // State to save the number of forwards
    const [numForwards, setNumForwards] = useState(0);
    // State to save the list of all goalkeepers in the system
    const [goalkeeperList, setGoalkeeperList] = useState([]);
    // State to save the list of all defenders in the system
    const [defendersList, setDefendersList] = useState([]);
    // State to save the list of all midfielders in the system
    const [midfieldersList, setMidfieldersList] = useState([]);
    // State to save the list of all forwards in the system
    const [forwardsList, setForwardsList] = useState([]);
    // State to save the list of all the selected players to be later saved in the system
    const [players, setPlayers] = useState({
        goalkeeper: "",
    });
    // State to manage the amount of enabled options in the selects of numDefenders, numMidfielders and numForwards
    const [enabledOptions, setEnabledOptions] = useState(11);
    // Number of players in a field excluding the goalkeeper
    const totalPlayers = 10;
    /*
        Creates an array to enumerate the number of options available to the selects of numDefenders, numMidfielders and
        numForwards
     */
    const maxPlayersOptions = Array.from({length: totalPlayers}, (x, i) => i+1);
    // Amount of players left to be selected
    let remainingPlayers = totalPlayers - numDefenders - numMidfielders - numForwards

    /*
        Every time numDefenders, numMidfielders or numForwards value change,
        it shall also change the value of enabledOptions
     */
    useEffect(() => {
        setEnabledOptions(remainingPlayers);
    }, [numDefenders, numMidfielders, numForwards, remainingPlayers]);

    /*
        Gets all the players in the system and saves them in a list based on their position. If anything happens, an
        error message is returned.
     */
    useEffect(() => {
        playerService.get_players_position_detail().then((result) => {
            const data = result.data
            for(let i = 0; i < data.length; i++) {
                const element = data[i]
                if(element.position.type === "GOL") {
                    setGoalkeeperList(prevState => ([...prevState, element]))
                } else if (data[i].position.type === "DEF") {
                    setDefendersList(prevState => ([...prevState, element]))
                } else if (data[i].position.type === "MED") {
                    setMidfieldersList(prevState => ([...prevState, element]))
                } else if (data[i].position.type === "DEL") {
                    setForwardsList(prevState => ([...prevState, element]))
                }
            }
        }).catch(() => {
            genericFunctions.getDataErrorMessage("jugadores");
        })
    }, [])

    /*
        Creates an object with all the information needed to be sent to the server and makes the API call.
        If everything goes well, a success message is returned. Otherwise, an error message is returned
     */
    const handleSubmit = (event) => {
        const formationObj = {
            "formation_name": formationName,
            "num_def": numDefenders,
            "num_mid": numMidfielders,
            "num_fwd": numForwards,
            "players": players,
        }
        formationService.create_formation(formationObj).then(() => {
            genericFunctions.creationSuccessMessage("formación");
        }).catch(() => {
            genericFunctions.creationErrorMessage("formación");
        })
        event.preventDefault();
    }

    return(
        <Container maxWidth="md">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Crear formación
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="formationName"
                                variant="outlined"
                                required
                                fullWidth
                                id="formationName"
                                label="Nombre"
                                autoFocus
                                onChange={e => setFormationName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl required variant="outlined" className={classes.formControl}>
                                <InputLabel id="numdefenders-label">N° Defensas</InputLabel>
                                <Select
                                    labelId="numdefenders-label"
                                    id="numDefenders"
                                    value={numDefenders ? numDefenders : ""}
                                    onChange={e => setNumDefenders(e.target.value)}
                                    label="N° Defensas"
                                >
                                    <MenuItem key="default" value="0">
                                        0
                                    </MenuItem>
                                    {maxPlayersOptions.map(element => (
                                        <MenuItem key={element}
                                                  value={element}
                                                  disabled={element > enabledOptions && element > numDefenders + remainingPlayers}>
                                            {element}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl required variant="outlined" className={classes.formControl}>
                                <InputLabel id="nummidfielders-label">N° Mediocampistas</InputLabel>
                                <Select
                                    labelId="nummidfielders-label"
                                    id="numMidfielders"
                                    value={numMidfielders ? numMidfielders : ""}
                                    onChange={e => setNumMidfielders(e.target.value)}
                                    label="N° Mediocampistas"
                                >
                                    <MenuItem key="default" value="0">
                                        0
                                    </MenuItem>
                                    {maxPlayersOptions.map(element => (
                                        <MenuItem key={element}
                                                  value={element}
                                                  disabled={element > enabledOptions && element > numMidfielders + remainingPlayers}>
                                            {element}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl required variant="outlined" className={classes.formControl}>
                                <InputLabel id="numforwards-label">N° Delanteros</InputLabel>
                                <Select
                                    labelId="numforwards-label"
                                    id="numForwards"
                                    value={numForwards ? numForwards : ""}
                                    onChange={e => setNumForwards(e.target.value)}
                                    label="N° Delanteros"
                                >
                                    <MenuItem key="default" value="0">
                                        0
                                    </MenuItem>
                                    {maxPlayersOptions.map(element => (
                                        <MenuItem key={element}
                                                  value={element}
                                                  disabled={element > enabledOptions && element > numForwards + remainingPlayers}>
                                            {element}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required variant="outlined" className={classes.formControl}>
                                <InputLabel id="goalkeeper-label">Golero</InputLabel>
                                <Select
                                    labelId="goalkeeper-label"
                                    id="goalkeeper"
                                    value={players.goalkeeper}
                                    onChange={e => setPlayers(prevState => ({...prevState, goalkeeper: e.target.value}))}
                                    label="Golero"
                                >
                                    <MenuItem key="default" value="default" disabled>
                                        Seleccione una opción
                                    </MenuItem>
                                    {goalkeeperList.map(element => (
                                        <MenuItem key={element.player_id}
                                                  value={element.player_id}>
                                            {element.player_first_name} {element.player_last_name} - {element.position.position_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {
                            /*
                                Generate the amount of selects necessary based on the number of players selected for
                                each position
                             */
                        }
                        {
                            Array.from({length: numDefenders}, (x, i) => i + 1).map((element) =>
                                <PlayersSelect
                                    formControl={classes.formControl}
                                    playerNum={element}
                                    playerType="Defensa"
                                    setPlayerValue={setPlayers}
                                    playersList={defendersList}
                                    selectedPlayersList={players}
                                />
                            )
                        }
                        {
                            Array.from({length: numMidfielders}, (x, i) => i + numDefenders + 1).map((element) =>
                                <PlayersSelect
                                    formControl={classes.formControl}
                                    playerNum={element}
                                    playerType="Mediocampista"
                                    setPlayerValue={setPlayers}
                                    playersList={midfieldersList}
                                    selectedPlayersList={players}
                                />
                            )
                        }
                        {
                            Array.from({length: numForwards}, (x, i) => i + numDefenders + numMidfielders + 1).map((element) =>
                                <PlayersSelect
                                    formControl={classes.formControl}
                                    playerNum={element}
                                    playerType="Delantero"
                                    setPlayerValue={setPlayers}
                                    playersList={forwardsList}
                                    selectedPlayersList={players}
                                />
                            )
                        }

                        <MuiThemeProvider theme={submitButton}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Crear formación
                            </Button>
                        </MuiThemeProvider>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default CreateFormation