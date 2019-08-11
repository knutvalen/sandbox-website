import React from 'react';
import AppTheme from '../../models/appTheme';
import Grid from '@material-ui/core/Grid';
import OptionsCard from '../../views/optionsCard';
import OtherOptionsCard from '../../views/otherOptionsCard';
import BottomAppBar from '../../views/bottomAppBar';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListCard from '../../views/listCard';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import MoreOptionsCard from '../../views/moreOptionsCard';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import SelectedMenu from '../../views/selectedMenu';
import TableCard from '../../views/tableCard';
import withAuthorization from '../withAuthorization';

const styles = {
    root: {
        margin: AppTheme.spacing.unit * 2,
    },
    bottomAppBar: {
        bottom: 0,
        position: "fixed",
        width: "100%",
        zIndex: AppTheme.zIndex.appBar,
        backgroundColor: AppTheme.palette.background.paper,
    },
    bottomAppBarContent: {
        margin: AppTheme.spacing.unit * 2,
        overflowY: 'auto',
    },
    button: {
        margin: AppTheme.spacing.unit,
    },
    leftIcon: {
        marginRight: AppTheme.spacing.unit,
        width: 18,
        height: 18,
    },
};

const CLEAN_STATE = {
    expanded: false,
    fullscreen: false,
    bottomAppBarHeight: 0,
};

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...CLEAN_STATE,
        };
    }

    componentDidMount() {
        this.setState({
            bottomAppBarHeight: this.bottomAppBar ? this.bottomAppBar.clientHeight : null,
        });
    }

    handleExpandAction() {
        const expanded = this.state.fullscreen ? false : !this.state.expanded;

        this.setState({
            expanded: expanded,
            fullscreen: false,
        });
    }

    handleFullscreenAction() {
        this.setState({
            fullscreen: !this.state.fullscreen,
        });
    }

    render() {
        const { expanded, fullscreen, bottomAppBarHeight } = this.state;

        const expandIcon = (expanded || fullscreen) ? <ExpandMoreIcon/> : <ExpandLessIcon/>;
        const fullscreenIcon = fullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>;
        const bottomAppBarHeader = <BottomAppBar title="Title"
                                                 subTitle="Subtitle"
                                                 onExpand={() => this.handleExpandAction()}
                                                 onFullscreen={() => this.handleFullscreenAction()}
                                                 expandIcon={expandIcon}
                                                 fullscreenIcon={fullscreenIcon}/>;
        const displayBottomAppBarContent = (expanded || fullscreen) ? "block" : "none";
        const bottomAppBarContentExpandedHeight = 300;
        const heightBottomAppBarContent = fullscreen ? '100%' : bottomAppBarContentExpandedHeight;
        const bottomAppBarStyle = fullscreen ? null : styles.bottomAppBar;
        const mainContentPaddingBottom = expanded ? bottomAppBarHeight + bottomAppBarContentExpandedHeight + (styles.bottomAppBarContent.margin * 2) : bottomAppBarHeight;

        const mainContent = fullscreen
            ? null
            : (
            <Grid style={{...styles.root, paddingBottom: mainContentPaddingBottom}}>
                <Grid container spacing={AppTheme.spacing.unit * 2}>
                    <Grid item md={12} xs={12}>
                        <OptionsCard/>
                    </Grid>
                    <Grid item md={6} xs={12} direction="column" >
                        <Grid container spacing={AppTheme.spacing.unit * 2}>
                            <Grid item md={12} xs={12}>
                                <OtherOptionsCard switches={[{label: "Switch 1", checked: false}, {label: "Switch 2", checked: false}]}
                                                  menuOptions={["Option 1", "Option 2", "Option 3"]}/>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <OtherOptionsCard switches={[{label: "Switch 1", checked: false}, {label: "Switch 2", checked: false}]}
                                                  menuOptions={["Option 1", "Option 2", "Option 3"]}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} xs={12} sm={6} direction="column">
                        <ListCard list={["Item 1", "Item 2", "Item 3"]}/>
                    </Grid>
                    <Grid item md={6} xs={12} sm={6}>
                        <MoreOptionsCard switches={[{label: "Switch 1", checked: false}, {label: "Switch 2", checked: false}]}/>
                    </Grid>
                    <Grid container md={6} xs={12} justify="flex-end" direction="column">
                        <Grid container alignItems="baseline" justify="flex-end">
                            <Grid item>
                                <SelectedMenu menuOptions={["Option 1", "Option 2", "Option 3"]} label="Dropdown" onSelect={(event, subLabel) => console.log(subLabel)}/>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" style={styles.button} size="large">
                                    <DoneIcon style={styles.leftIcon}/>
                                    Done
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );

        return (
            <Grid>
                {mainContent}
                <div ref={(bottomAppBar) => {this.bottomAppBar = bottomAppBar}}
                     style={bottomAppBarStyle}>
                    {bottomAppBarHeader}
                    <Grid style={{...styles.bottomAppBarContent, height: heightBottomAppBarContent, display: displayBottomAppBarContent}}>
                        <Grid container md={12} xs={12}>
                            <Grid item md={12} xs={12}>
                                <TableCard/>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        );
    }
}

export default withAuthorization((authUser) => !!authUser)(MainScreen);