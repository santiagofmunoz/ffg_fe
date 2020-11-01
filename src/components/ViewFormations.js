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
import FormationService from "./services/FormationService";
import {PictureAsPdf} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const formationService = new FormationService();

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
    const classes = useStyles();
    const [formationsList, setFormationsList] = useState([]);

    useEffect(() => {
        formationService.get_formations().then((result) => {
            setFormationsList(result.data);
        })
    }, [])

    const handlePDFExport = (formationId) => {
        formationService.export_formation_as_pdf(formationId).then((result) => {
            fileDownload(result.data, 'formacion.pdf')
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