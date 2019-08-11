import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import theme from "../models/appTheme";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
    root: {
        height: '100%',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
    },
    header: {
        paddingLeft: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit,
    },
    list: {
        alignSelf: 'stretch',
        overflow: 'auto',
    },
};

class ListCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            headerHeight: 0,
        });
    }

    componentDidMount() {
        this.setState({
            headerHeight: this.header.clientHeight,
        });
    }

    render() {
        const { classes, list } = this.props;
        const { headerHeight } = this.state;
        const notPaperHeight = headerHeight + theme.spacing.unit * 4;

        return (
            <Grid className={classes.root}>
                <div ref={(header) => {this.header = header}}>
                    <Typography variant="subheading" className={classes.header}>
                        List
                    </Typography>
                </div>
                <Grid container style={{height: 'calc(100% - ' + notPaperHeight + 'px)'}}>
                    <Grid item xs={12} md={12}>
                        <Paper className={classes.paper}>
                            <Grid container>
                                <List>
                                    {list.map(item => (
                                        <Grid item xs={12} md={12} >
                                            <ListItem>
                                                <ListItemText primary={item}/>
                                            </ListItem>
                                        </Grid>
                                    ))}
                                </List>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    };
}

ListCard.propTypes = {
    classes: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListCard);