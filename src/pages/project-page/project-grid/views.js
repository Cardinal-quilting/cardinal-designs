import React, { Component } from "react";

import "styles/pages/project-page/project-grid/views.css";

class Views extends Component {
    render() {
        const width = this.props.width.toString()+"vw";

        return (
            <div
                className="views"
                style={{
                    zIndex: this.props.zIndex,
                    minWidth: width,
                    maxWidth: width,
                    width: width
                }}
            >
                VIEWS!
            </div>
        );
    }
}

export default Views;