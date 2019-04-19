import React from "react";
import injectSheet from 'react-jss';
import { a4, blackBorder, card, letter } from "../styles";

const styles = {}
const Component = () => {
    return (
        <div id="root" className={this.state.classSize}>
            hello world
                {this.state.classSize}
        </div>
    )
}

// Finally, inject the stylesheet into the component.
const StyledComponent = injectSheet(styles)(Component)

export default StyledComponent;
