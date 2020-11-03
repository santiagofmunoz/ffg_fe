import React, {useEffect, useState} from 'react';
import fileDownload from 'js-file-download'
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {PictureAsPdf} from "@material-ui/icons";
import FormationService from "./services/FormationService";
import GenericFunctions from "./GenericFunctions";

const genericFunctions = new GenericFunctions()
const formationService = new FormationService();

// CSS Styles for the page
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    tableStyle: {
        marginTop: theme.spacing(3),
        height: '70vh',
        width: '100%'
    },
}));

function ViewFormations() {
    // Instance to use the styles
    const classes = useStyles();
    // State to save the list of all formations in the system
    const [formationsList, setFormationsList] = useState([]);

    /*
        Gets all the formations saved in the system and then sets the object in formationsList.
        This effect runs only in the first render
     */
    useEffect(() => {
        formationService.get_formations().then((result) => {
            setFormationsList(result.data);
        })
    }, [])

    /*
        Makes an API call to export_formation_as_pdf using formationId as parameter. Then, if everything went well,
        the system returns the PDF with the formation and uses fileDownload to prompt the user the PDF.
        Otherwise, an error message is displayed
     */
    const handlePDFExport = (formationId) => {
        formationService.export_formation_as_pdf(formationId).then((result) => {
            fileDownload(result.data, 'formacion.pdf')
        }).catch(() => {
            genericFunctions.getPDFErrorMessage();
        })
    }

    return(
        <Container maxWidth="md">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Visualizar formaciones
                </Typography>
                <TableContainer className={classes.tableStyle} component={Paper}>
                    <Table aria-label="formations-table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nombre</TableCell>
                                <TableCell align="center">N° Defensas</TableCell>
                                <TableCell align="center">N° Mediocampistas</TableCell>
                                <TableCell align="center">N° Delanteros</TableCell>
                                <TableCell align="center">Exportar a PDF</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formationsList.map((row) => (
                                <TableRow key={row.formation_id}>
                                    <TableCell component="th" scope="row" align="center">{row.formation_name}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{row.num_def}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{row.num_mid}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{row.num_fwd}</TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Button
                                            onClick={() => handlePDFExport(row.formation_id)}
                                        >
                                            <PictureAsPdf />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    )
}

export default ViewFormations