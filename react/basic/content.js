import React from "react";
import injectSheet from 'react-jss';
import ProfilePicture from '../assets/homer-simpson.png';
import {
    picture,
    image,
    flex, 
    flexGrow,
    fullHeight,
    paddingX16,
    paddingY16,
    flexCenter,
    flexColumn
} from '../styles';

const styles = {
    root: {
        ...flex,
        ...fullHeight
    },
    lhs: {
        ...flexGrow,
        ...paddingX16,
        ...paddingY16,
        ...flexColumn,
        ...flexCenter
    },
    rhs: {
        flex: "0 0 120px",
        ...flexCenter
    },
    contentRow: {
        ...paddingY16
    },
    picture,
    image
}
const BasicContent = ({ classes }) => {
    return (
        <div id="basic_root" className={classes.root}>
            <div className={classes.lhs}>
                <div id="firstname" className={classes.contentRow}>Homer</div>
                <div id="lastname" className={classes.contentRow}>Simpson</div>
                <div id="sector" className={classes.contentRow}>Sector 7C</div>
            </div>
            <div className={classes.rhs}>
                <div className={classes.picture}>
                    <img src={ProfilePicture}
                        className={classes.image}
                        alt="Homer Simpson" />
                </div>
            </div>
        </div>
    )
}

// Finally, inject the stylesheet into the component.
const StyledComponent = injectSheet(styles)(BasicContent)

export default StyledComponent;
