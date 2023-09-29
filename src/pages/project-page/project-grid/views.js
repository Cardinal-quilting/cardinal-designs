import React, { Component } from "react";

import "styles/pages/project-page/project-grid/views.css";

import Button from "infrastructure/button";
import Tooltip from "infrastructure/tooltip";

import GridMode from "pages/project-page/project-grid/grid-mode";

class Views extends Component {
    splitting_section() {
        return (
            <Tooltip
                pos={{
                    x: "2vw",
                    y: "-2vh"
                }}
                hover="1000"
                message="Cancel splitting the section. Right click will also cancel."
                font_size="1.25vmin"
            >
            <Button 
                on_click={this.props.cancel_splitting_section_grid_mode} 
                name="Cancel"
            /> 
            </Tooltip>
        )
    }

    render() {
        const width = this.props.width.toString()+"vw";

        var display = "DEFAULT VIEW";
        if( GridMode.splitting_section===this.props.grid_mode ) {
            display = this.splitting_section()
        }

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
                {display}
            </div>
        );
    }
}

export default Views;