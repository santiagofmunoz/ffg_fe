import React from 'react'
import {useHistory} from "react-router-dom";
import {
    AppBar,
    CssBaseline,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    SwipeableDrawer,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles((theme) => ({
    headerRoot: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "#245b80"
    },
    drawer: {
        width: 250,
    },
    toolbar: theme.mixins.toolbar,
}));

function Header(props) {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [state, setState] = React.useState({left: false})
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, [anchor]: open });
    }
    const headerText = useMediaQuery(theme.breakpoints.up('sm')) ? "Football Formation Generator" : "FFG";

    function handleNavigation(to) {
        history.push("/" + to)
    }

    const drawer = (anchor) => (
        <div
            className={classes.drawer}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button key="create_player" onClick={() => handleNavigation("crear_jugador")}>
                    <ListItemText primary="Crear Jugador" />
                </ListItem>
                <ListItem button key="create_formation" onClick={() => handleNavigation("crear_formacion")}>
                    <ListItemText primary="Crear Formacion" />
                </ListItem>
            </List>
        </div>
    )

    return (
        <div className={classes.headerRoot}>
            <CssBaseline />
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={toggleDrawer("left", true)}
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {headerText}
                    </Typography>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="left"
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
                open={state['left']}
            >
                {drawer("left")}
            </SwipeableDrawer>
        </div>
    )
}

export default Header