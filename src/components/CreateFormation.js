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

const submitButton = createMuiTheme({
    palette: {
        primary: {500: "#245b80"}
    },
})

function CreateFormation(props) {
    const classes = useStyles();
    const [formationName, setFormationName] = useState("");
    const [numDefenders, setNumDefenders] = useState(0);
    const [numMidfielders, setNumMidfielders] = useState(0);
    const [numForwards, setNumForwards] = useState(0);
    const [goalkeeperList, setGoalkeeperList] = useState([]);
    const [defendersList, setDefendersList] = useState([]);
    const [midfieldersList, setMidfieldersList] = useState([]);
    const [forwardsList, setForwardsList] = useState([]);
    const [players, setPlayers] = useState({
        goalkeeper: {},
    });
    const [disabledOptions, setDisabledOptions] = useState(11);
    const totalPlayers = 10;
    const maxPlayersOptions = Array.from({length: totalPlayers}, (x, i) => i+1);
    let remainingPlayers = totalPlayers - numDefenders - numMidfielders - numForwards

    useEffect(() => {
        setDisabledOptions(remainingPlayers);
    }, [numDefenders, numMidfielders, numForwards, remainingPlayers]);

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
        })
    }, [])

    const handleSubmit = (event) => {
        const formationObj = {
            "formation_name": formationName,
            "num_def": numDefenders,
            "num_mid": numMidfielders,
            "num_fwd": numForwards,
            "players": players,
        }
        formationService.create_formation(formationObj).then(() => {
            genericFunctions.successMessage("formación");
        }).catch(() => {
            genericFunctions.errorMessage("formación");
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
                                                  disabled={element > disabledOptions && element > numDefenders + remainingPlayers}>
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
                                                  disabled={element > disabledOptions && element > numMidfielders + remainingPlayers}>
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
                                                  disabled={element > disabledOptions && element > numForwards + remainingPlayers}>
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
                                    onChange={e => setPlayers(prevState => ({...players, goalkeeper: e.target.value}))}
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
                            Array.from({length: numDefenders}, (x, i) => i + 1).map((element) =>
                                <PlayersSelect
                                    formControl={classes.formControl}
                                    playerNum={element}
                                    playerType="Defensa"
                                    setPlayerValue={setPlayers}
                                    playersList={defendersList}
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