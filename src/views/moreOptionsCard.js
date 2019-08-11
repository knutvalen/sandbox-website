import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import theme from "../models/appTheme";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

const styles = {
    paper: {
        padding: theme.spacing.unit * 2,
    },
    header: {
        paddingLeft: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit,
    },
};

class MoreOptionsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioButtonGroupValue: 'option 1',
            switches: props.switches,
        };
    }

    handleRadioButtonChange(event) {
        let newValue = '';

        if (event.target.value === this.state.radioButtonGroupValue) {
            newValue = '';
        } else {
            newValue = event.target.value;
        }

        this.setState({
            radioButtonGroupValue: newValue,
        });
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
        const { classes } = this.props;
        const { switches } = this.state;

        return (
            <Grid container direction={"column"}>
                <Typography variant="subheading" className={classes.header}>
                    More options
                </Typography>
                <Grid container>
                    <Grid item md={12} xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={theme.spacing.unit}>
                                <Grid item md={6} xs={6}>
                                    <FormControl>
                                        <FormLabel>Options</FormLabel>
                                        <RadioGroup value={this.state.radioButtonGroupValue} onChange={(event) => this.handleRadioButtonChange(event)}>
                                            <FormControlLabel control={<Radio/>} label="Option 1" value="option 1"/>
                                            <FormControlLabel control={<Radio/>} label="Option 2" value="option 2"/>
                                            <FormControlLabel control={<Radio/>} label="Option 3" value="option 3"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={6}>
                                    {switches.map(_switch => (
                                        <FormGroup>
                                            <FormControlLabel control={
                                                <Switch checked={_switch.checked} onChange={(event) => this.handleSwitchChange(_switch.label, event)}/>
                                            } label={_switch.label}/>
                                        </FormGroup>
                                    ))}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

MoreOptionsCard.propTypes = {
    classes: PropTypes.object.isRequired,
    switches: PropTypes.object.isRequired,
};

export default withStyles(styles)(MoreOptionsCard);