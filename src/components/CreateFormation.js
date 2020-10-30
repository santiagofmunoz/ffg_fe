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
    // const [defendersList, setDefendersList] = useState([]);
    // const [midfieldersList, setMidfieldersList] = useState([]);
    // const [forwardsList, setForwardsList] = useState([]);
    const [goalkeeper, setGoalkeeper] = useState({});
    // const [player1, setPlayer1] = useState({});
    // const [player2, setPlayer2] = useState({});
    // const [player3, setPlayer3] = useState({});
    // const [player4, setPlayer4] = useState({});
    // const [player5, setPlayer5] = useState({});
    // const [player6, setPlayer6] = useState({});
    // const [player7, setPlayer7] = useState({});
    // const [player8, setPlayer8] = useState({});
    // const [player9, setPlayer9] = useState({});
    // const [player10, setPlayer10] = useState({});
    const [disabledOptions, setDisabledOptions] = useState(11);
    const totalPlayers = 10;
    const maxPlayersOptions = Array.from({length: totalPlayers}, (x, i) => i+1);
    let remainingPlayers = totalPlayers - numDefenders - numMidfielders - numForwards

    useEffect(() => {
        setDisabledOptions(remainingPlayers);
    }, [numDefenders, numMidfielders, numForwards, remainingPlayers]);

    useEffect(() => {
        playerService.get_players_by_position_type("GOL").then((result) => {
            setGoalkeeperList(result.data)
        })
    }, [])

    function handleSubmit(event) {
        const formationObj = {
            "formation_name": formationName,
            "num_def": numDefenders,
            "num_mid": numMidfielders,
            "num_fwd": numForwards,
        }
        formationService.create_formation(formationObj).then((result) => {
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
                                    value={numDefenders}
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
                                    value={numMidfielders}
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
                                    value={numForwards}
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
                                    value={goalkeeper}
                                    onChange={e => setGoalkeeper(e.target.value)}
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