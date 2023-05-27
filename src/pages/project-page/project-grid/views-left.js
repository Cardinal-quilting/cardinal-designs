import React, { Component } from "react";

import "styles/pages/project-page/project-grid/views-left.css";

class ViewsLeft extends Component {
    render() {
        return (
            <div
                className="views-left"
                style={{
                    zIndex: this.props.zIndex,
                    minWidth: this.props.left_width,
                    maxWidth: this.props.left_width,
                }}
            >
            </div>
        );
    }
}

export default ViewsLeft;