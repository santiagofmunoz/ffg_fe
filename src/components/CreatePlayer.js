import React, {useState, useEffect} from 'react'
import {
    Button,
    Container,
    createMuiTheme,
    CssBaseline,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    MuiThemeProvider,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import GenericFunctions from "./GenericFunctions";
import PlayerService from './services/PlayerService'
import PositionService from "./services/PositionService";

const genericFunctions = new GenericFunctions();
const playerService = new PlayerService();
const positionService = new PositionService();

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

function CreatePlayer() {
    // Instance to use the styles
    const classes = useStyles();
    // State to save player's first name
    const [playerFirstName, setPlayerFirstName] = useState(null);
    // State to save player's last name
    const [playerLastName, setPlayerLastName] = useState(null);
    // State to save player's position
    const [positionId, setPositionId] = useState("");
    // State to save all the positions saved in the system
    const [positionList, setPositionList] = useState([]);

    /*
        Gets all the positions saved in the system and then sets the object in positionList.
        This effect runs only in the first render
     */
    useEffect(() => {
        positionService.get_positions().then((result) => {
            setPositionList(result.data)
        })
    }, [])

    /*
        Creates an object with all the information needed to be sent to the server and makes the API call.
        If everything goes well, a success message is returned. Otherwise, an error message is returned
     */
    function handleSubmit(event) {
        const playerObj = {
            "player_first_name": playerFirstName,
            "player_last_name": playerLastName,
            "position": positionId,
        }
        playerService.createPlayer(playerObj).then(() => {
            genericFunctions.creationSuccessMessage("jugador")
        }).catch(() => {
            genericFunctions.creationErrorMessage("jugador")
        })
        event.preventDefault();
    }

    return (
        <Container maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Crear jugador
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="playerFirstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="playerFirstName"
                                label="Nombre"
                                autoFocus
                                onChange={e => setPlayerFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="family-name"
                                name="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                id="playerLastName"
                                label="Apellido"
                                onChange={e => setPlayerLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required variant="outlined" className={classes.formControl}>
                                <InputLabel id="position-label">Posición</InputLabel>
                                <Select
                                    labelId="position-label"
                                    id="position"
                                    value={positionId}
                                    onChange={e => setPositionId(e.target.value)}
                                    label="Posición"
                                >
                                    <MenuItem key="default" value="" disabled>
                                        Seleccione una opción
                                    </MenuItem>
                                    {positionList.map(element => (
                                        <MenuItem key={element.position_id} value={element.position_id}>
                                            {element.type} - {element.position_name}
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
                                Crear jugador
                            </Button>
                        </MuiThemeProvider>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default CreatePlayer