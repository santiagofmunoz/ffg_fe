import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import FormationService from "./services/FormationService";
import GenericFunctions from "./GenericFunctions";

const genericFunctions = new GenericFunctions();
const formationService = new FormationService();

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

function CreateFormation(props) {
    const classes = useStyles();
    const [formationName, setFormationName] = useState("");
    const [numDefenders, setNumDefenders] = useState(0);
    const [numMidfielders, setNumMidfielders] = useState(0);
    const [numForwards, setNumForwards] = useState(0);
    const [disabledOptions, setDisabledOptions] = useState(11);
    const totalPlayers = 10;
    const maxPlayersOptions = Array.from({length: totalPlayers}, (x, i) => i+1);
    let remainingPlayers = totalPlayers - numDefenders - numMidfielders - numForwards

    useEffect(() => {
        setDisabledOptions(remainingPlayers);
    }, [numDefenders, numMidfielders, numForwards, remainingPlayers]);

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
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default CreateFormation