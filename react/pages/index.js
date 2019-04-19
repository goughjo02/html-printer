import React from "react";
import injectSheet from 'react-jss';
import { a4, blackBorder, card, letter } from "../styles";

const styles = {
    a4: {
        ...a4,
        ...blackBorder
    },
    card: {
        ...card,
        ...blackBorder
    },
    letter: {
        ...letter,
        ...blackBorder
    },
}
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classSize: ''
        }
    }
    componentWillMount() {
        const { classes } = this.props;
        var urlParams = new URLSearchParams(location.search);
        console.log(urlParams.get('size') === "letter")
        if(urlParams.get('size') === "a4"){
            this.setState({classSize: classes.a4})
        } else if (urlParams.get('size') === "card") {
            this.setState({classSize: classes.card});
        } else if (urlParams.get('size') === "letter") {
            this.setState({classSize: classes.letter})
        } else {
            this.setState({classSize: classes.a4});
        }
    }
    render() {
        return (
            <div id="root" className={this.state.classSize}>
                hello world
                {this.state.classSize}
            </div>
        )
    }
}

// Finally, inject the stylesheet into the component.
const StyledComponent = injectSheet(styles)(Component)

export default StyledComponent;
