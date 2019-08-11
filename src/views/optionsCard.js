import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import theme from "../models/appTheme";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SelectedMenu from './selectedMenu';
import TextField from '@material-ui/core/TextField';

const styles = {
    paper: {
        padding: theme.spacing.unit * 2,
    },
    header: {
        paddingLeft: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
};

function OptionsCard(props) {
    const { classes } = props;

    return (
        <Grid container direction={"column"}>
            <Typography variant="subheading" className={classes.header}>
                Options
            </Typography>
            <Grid container>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={theme.spacing.unit}>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description"
                                       className={classes.textField}
                                       margin="normal"
                                       fullWidth/>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

OptionsCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OptionsCard);