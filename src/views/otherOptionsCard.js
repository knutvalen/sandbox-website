import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import theme from "../models/appTheme";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import SelectedMenu from "./selectedMenu";

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

class OtherOptionsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switches: props.switches,
        };
    }

    handleSwitchChange(title, event) {
        let switches = this.state.switches;

        for (let i = 0; i < switches.length; i++) {
            if (switches[i].label === title) {
                switches[i] = {...switches[i], checked: event.target.checked}
                break;
            }
        }

        this.setState({
            switches: switches,
        });
    }

    render() {
        const { classes, menuOptions  } = this.props;
        const { switches } = this.state;

        return (
            <Grid container direction={"column"}>
                <Typography variant="subheading" className={classes.header}>
                    Other options
                </Typography>
                <Grid container>
                    <Grid item md={12} xs={12}>
                        <Paper className={classes.paper}>
                            {switches.map(_switch => (
                                <Grid container alignItems="flex-end" spacing={theme.spacing(1)}>
                                    <Grid item md={6} xs={6}>
                                        <FormGroup>
                                            <FormControlLabel control={
                                                <Switch checked={_switch.checked} onChange={(event) => this.handleSwitchChange(_switch.label, event)}/>
                                            } label={_switch.label}/>
                                        </FormGroup>
                                    </Grid>
                                    <Grid item md={2} xs={2}>
                                        <TextField id={_switch.label} label="Unit" margin="normal" fullWidth/>
                                    </Grid>
                                    <Grid item md={4} xs={4}>
                                        <SelectedMenu menuOptions={menuOptions} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                                    </Grid>
                                </Grid>
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

OtherOptionsCard.propTypes = {
    classes: PropTypes.object.isRequired,
    switches: PropTypes.object.isRequired,
    menuOptions: PropTypes.array.isRequired,
};

export default withStyles(styles)(OtherOptionsCard);