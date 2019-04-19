import React from "react";
import injectSheet from 'react-jss';
import { a4, blackBorder, card, letter } from "../styles";

const styles = {}
const Component = () => {
    return (
        <div id="basic_root">
            <div id="firstName"></div>
            <div id="lastName"></div>
            <div id="email"></div>
        </div>
    )
}

// Finally, inject the stylesheet into the component.
const StyledComponent = injectSheet(styles)(Component)

export default StyledComponent;
