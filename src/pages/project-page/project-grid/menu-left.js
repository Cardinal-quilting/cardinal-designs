import React, { Component } from "react";

import GlobalOptions from "pages/project-page/global-options/global-options";

import "styles/pages/project-page/project-grid/menu-left.css";

class MenuLeft extends Component {
    render() {
        return (
            <div
                className="menu-left"
                style={{
                    zIndex: this.props.zIndex,
                    minWidth: this.props.left_width,
                    maxWidth: this.props.left_width
                }}
            >
                <GlobalOptions/>
            </div>
        );
    }
}

export default MenuLeft;