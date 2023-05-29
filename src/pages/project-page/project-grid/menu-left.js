import React, { Component } from "react";

import BackgroundImageOptions from "pages/project-page/project-grid/background-image-options";

import "styles/pages/project-page/project-grid/menu-left.css";

class MenuLeft extends Component {
    render() {
        return (
            <div
                className="menu-left"
                style={{
                    zIndex: this.props.zIndex,
                    minWidth: String(this.props.left_width)+"vw",
                    maxWidth: String(this.props.left_width)+"vw"
                }}
            >
                <BackgroundImageOptions
                    title="Background image"
                    width={this.props.left_width}
                    title_font_size={String(Math.min(0.095*this.props.left_width, 1.5))+"vw"}
                    font_size={String(Math.min(0.085*this.props.left_width, 1.5))+"vw"}
                    background_image={this.props.background_image}
                    update_background_image={this.props.update_background_image}
                />
            </div>
        );
    }
}

export default MenuLeft;