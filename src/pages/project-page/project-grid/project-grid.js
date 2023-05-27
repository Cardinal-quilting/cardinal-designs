import React, { Component } from "react";

import Row from "./row";
import ViewsLeft from "./views-left";
import Views from "./views";
import ViewsRight from "./views-right";

import MenuLeft from "./menu-left";
import MenuRight from "./menu-right";

import ProjectDisplay from "pages/project-page/project-display/project-display";

import "styles/pages/project-page/project-grid/project-grid.css";

class ProjectGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left_width: 10,
            right_width: 10,
            left_border_color: "--grey-background-color",
            right_border_color: "--grey-background-color"
        }

        this.set_left_width = this.set_left_width.bind(this);
        this.set_right_width = this.set_right_width.bind(this);
        this.set_left_hover = this.set_left_hover.bind(this);
        this.set_right_hover = this.set_right_hover.bind(this);
    }

    set_left_width(width) {
        this.setState({
            left_width: width
        });
    }

    set_right_width(width) {
        this.setState({
            right_width: width
        });
    }

    set_left_hover(color) {
        this.setState({
            left_border_color: color
        });
    }

    set_right_hover(color) {
        this.setState({
            right_border_color: color
        });
    }

    render() {
        return (
            <div>
                <Row
                    set_left_hover={this.set_left_hover}
                    set_right_hover={this.set_right_hover}
                    set_left_width={this.set_left_width}
                    set_right_width={this.set_right_width}
                    left_width={this.state.left_width}
                    right_width={this.state.right_width}
                    left_border_color={this.state.left_border_color}
                    right_border_color={this.state.right_border_color}
                >
                    <ViewsLeft
                        zIndex={this.props.zIndex.views}
                        left_width={String(this.state.left_width)+"vw"}
                    />
                    <Views
                        zIndex={this.props.zIndex.views}
                        width={100-this.state.left_width-this.state.right_width}
                    />
                    <ViewsRight
                        zIndex={this.props.zIndex.views}
                        right_width={String(this.state.right_width)+"vw"}
                    />
                </Row>
                <Row
                    set_left_hover={this.set_left_hover}
                    set_right_hover={this.set_right_hover}
                    set_left_width={this.set_left_width}
                    set_right_width={this.set_right_width}
                    left_width={this.state.left_width}
                    right_width={this.state.right_width}
                    left_border_color={this.state.left_border_color}
                    right_border_color={this.state.right_border_color}
                >
                    <MenuLeft
                        zIndex={this.props.zIndex.menus}
                        left_width={String(this.state.left_width)+"vw"}
                    />
                    <ProjectDisplay
                        zIndex={this.props.zIndex.project_display}
                        enabled={this.props.enabled_components.project_display()}
                        project={this.props.project}
                        width={100-this.state.left_width-this.state.right_width}
                    />
                    <MenuRight
                        zIndex={this.props.zIndex.menus}
                        right_width={String(this.state.right_width)+"vw"}
                    />
                </Row>
            </div>
        );
    }
}

export default ProjectGrid;