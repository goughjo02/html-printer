import React from "react";
import injectSheet from 'react-jss';
import { a4, blackBorder } from "../styles";

const styles = {
    root: {
        ...a4,
        ...blackBorder
    }
}
const Component = ({ classes }) => (
    <div id="root" className={classes.root}>
        hello world
    </div>
)

// Finally, inject the stylesheet into the component.
const StyledComponent = injectSheet(styles)(Component)

export default StyledComponent;
