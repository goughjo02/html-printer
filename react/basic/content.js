import React from "react";
import injectSheet from 'react-jss';
import ProfilePicture from '../assets/homer-simpson.png';
import { picture } from '../styles';

const styles = {
    picture
}
const BasicContent = ({ classes }) => {
    return (
        <div id="basic_root">
            <div id="firstName"></div>
            <div id="lastName"></div>
            <div id="email"></div>
            <img src={ProfilePicture}
                className={classes.picture}
                alt="Homer Simpson" />
        </div>
    )
}

// Finally, inject the stylesheet into the component.
const StyledComponent = injectSheet(styles)(BasicContent)

export default StyledComponent;
