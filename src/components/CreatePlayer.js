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

function CreatePlayer(props) {
    const classes = useStyles();
    const [playerFirstName, setPlayerFirstName] = useState(null);
    const [playerLastName, setPlayerLastName] = useState(null);
    const [position, setPosition] = useState("");
    const [position_list, setPositionList] = useState([]);

    useEffect(() => {
        positionService.get_positions().then((result) => {
            setPositionList(result.data)
        })
    }, [])

    function handleSubmit(event) {
        const playerObj = {
            "player_first_name": playerFirstName,
            "player_last_name": playerLastName,
            "position": position,
        }
        playerService.createPlayer(playerObj).then(() => {
            genericFunctions.successMessage("jugador")
        }).catch(() => {
            genericFunctions.errorMessage("jugador")
        })
        event.preventDefault();
    }

    return (
        <Container maxWidth="sm">
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
                                    value={position}
                                    onChange={e => setPosition(e.target.value)}
                                    label="Posición"
                                >
                                    <MenuItem key="default" value="" disabled>
                                        Seleccione una opción
                                    </MenuItem>
                                    {position_list.map(element => (
                                        <MenuItem key={element.pk} value={element.pk}>
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