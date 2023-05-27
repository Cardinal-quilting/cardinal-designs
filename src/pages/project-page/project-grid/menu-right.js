import React, { Component } from "react";

import "styles/pages/project-page/project-grid/menu-right.css";

class MenuRight extends Component {
    render() {
        return (
            <div
                className="menu-right"
                style={{
                    zIndex: this.props.zIndex,
                    minWidth: this.props.right_width,
                    maxWidth: this.props.right_width
                }}
            >
                MENU RIGHT
            </div>
        );
    }
}

export default MenuRight;