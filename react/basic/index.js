import React from "react";
import ReactDOM from "react-dom";
import injectSheet from 'react-jss';
import { PageSize } from "../components";
import ProfilePicture from '../assets/donal-duck.png';
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
        <PageSize>
            <div id="basic_root" className={classes.root}>
                <div className={classes.lhs}>
                    <div id="firstname" className={classes.contentRow}></div>
                    <div id="lastname" className={classes.contentRow}></div>
                    <div id="email" className={classes.contentRow}></div>
                </div>
                <div className={classes.rhs}>
                    <div className={classes.picture}>
                        <img src={ProfilePicture}
                            className={classes.image}
                            alt="Donal Duck" />
                    </div>
                </div>
            </div>
        </PageSize>
    )
}

// Finally, inject the stylesheet into the component.
const StyledComponent = injectSheet(styles)(BasicContent)

ReactDOM.render(<StyledComponent />, document.getElementById("index"));
