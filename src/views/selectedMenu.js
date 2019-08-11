import React from 'react';
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

class SelectedMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElement: null,
            subLabel: "Choose",
            selectedIndex: null,
        };
    }

    handleClick(event) {
        this.setState({
            anchorElement: event.currentTarget
        });
    }

    handleClose(event, index, onSelect) {
        if (!event) {
            this.setState({
                anchorElement: null,
            });
        } else {
            const newSubLabel = event.currentTarget.textContent ? event.currentTarget.textContent : this.state.subLabel;
            const selectedIndex = index !== null ? index : this.state.selectedIndex;

            this.setState({
                anchorElement: null,
                subLabel: newSubLabel,
                selectedIndex: selectedIndex,
            });

            onSelect(event, newSubLabel);
        }
    }

    render() {
        const { anchorElement, subLabel, selectedIndex } = this.state;
        const { label, menuOptions, dense, disablePadding, onSelect } = this.props;

        return (
            <Grid>
                <List dense={dense} disablePadding={disablePadding}>
                    <ListItem button onClick={(event => this.handleClick(event))}>
                        <ListItemText primary={label} secondary={subLabel} secondaryTypographyProps={{noWrap: true}}/>
                    </ListItem>
                </List>
                <Menu anchorEl={anchorElement} open={Boolean(anchorElement)} onClose={(event) => this.handleClose(event, null, onSelect)}>
                    {menuOptions.map((option, index) => (
                        <MenuItem selected={index === selectedIndex}
                                  onClick={(event) => this.handleClose(event, index, onSelect)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>
        );
    }
}

SelectedMenu.propTypes = {
    label: PropTypes.string.isRequired,
    menuOptions: PropTypes.array.isRequired,
    dense: PropTypes.bool,
    disablePadding: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
};

export default SelectedMenu;