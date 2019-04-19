import React from "react";
import ReactDOM from "react-dom";
import Content from "./content";
import { PageSize } from "../components";

const Main = () => {
    return (
        <PageSize>
            <Content />
        </PageSize>
    )
}

ReactDOM.render(<Main />, document.getElementById("index"));