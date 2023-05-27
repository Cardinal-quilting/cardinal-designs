import React, { Component } from "react";

import "styles/pages/project-page/project-grid/views-right.css";

class ViewsRight extends Component {
    render() {
        return (
            <div
                className="views-right"
                style={{
                    zIndex: this.props.zIndex,
                    minWidth: this.props.right_width,
                    maxWidth: this.props.right_width,
                }}
            >
            </div>
        );
    }
}

export default ViewsRight;