import React from "react";
import injectSheet from 'react-jss';
import { a4, blackBorder, card, marginXAuto, marginTop32, letter } from "../styles";

const styles = {
    a4: {
        ...a4,
        ...blackBorder
    },
    card: {
        ...card,
        ...blackBorder,
        ...marginXAuto,
        ...marginTop32
    },
    letter: {
        ...letter,
        ...blackBorder,
        ...marginXAuto,
        ...marginTop32
    },
}
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classSize: null
        }
    }
    componentWillMount() {
        const { classes } = this.props;
        var urlParams = new URLSearchParams(location.search);
        console.log(urlParams.get('size') === "card")
        if (urlParams.get('size') === "A4") {
            this.setState({ classSize: classes.a4 })
        } else if (urlParams.get('size') === "card") {
            this.setState({ classSize: classes.card });
        } else if (urlParams.get('size') === "letter") {
            this.setState({ classSize: classes.letter })
        } else {
            this.setState({ classSize: classes.a4 });
        }
    }
    render() {
        const { classes } = this.props;
        var urlParams = new URLSearchParams(location.search);
        let className;
        console.log(urlParams.get('size'))
        for (let p of urlParams) {
            console.log(p);
          }
        console.log(urlParams.get('size') === "card")
        if (urlParams.get('size') === "a4") {
            // this.setState({ classSize: classes.a4 })
            className = classes.a4;
        } else if (urlParams.get('size') === "card") {
            // this.setState({ classSize: classes.card });
            className = classes.card;
        } else if (urlParams.get('size') === "letter") {
            // this.setState({ classSize: classes.letter })
            className = classes.letter;
        } else {
            // this.setState({ classSize: classes.a4 });
            className = classes.a4;
        }
        return (
            <div id="loadedRoot" className={className}>
                {this.props.children}
            </div>
        )
    }
}

// Finally, inject the stylesheet into the component.
const StyledComponent = injectSheet(styles)(Component)

export { StyledComponent as PageSize };
