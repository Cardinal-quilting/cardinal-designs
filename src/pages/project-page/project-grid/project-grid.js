import React, { Component } from "react";

import Row from "./row";
import ViewsLeft from "./views-left";
import Views from "./views";
import ViewsRight from "./views-right";

import MenuLeft from "./menu-left";
import MenuRight from "./menu-right";

import ProjectDisplay from "pages/project-page/project-display/project-display";
import GridMode from "pages/project-page/project-grid/grid-mode";

import "styles/pages/project-page/project-grid/project-grid.css";

class ProjectGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left_width: 13,
            right_width: 15,
            left_border_color: "--grey-background-color",
            right_border_color: "--grey-background-color",
            grid_mode: GridMode.default
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

    swap_grid_mode(new_grid_mode) {
        this.setState({
            grid_mode: new_grid_mode
        });
    }

    render() {
        return (
            <div>
                <Row
                    zIndex={this.props.zIndex.views}
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
                        grid_mode={this.state.grid_mode}
                        cancel_splitting_section_grid_mode={() => this.swap_grid_mode(GridMode.default)}
                    />
                    <ViewsRight
                        zIndex={this.props.zIndex.views}
                        right_width={String(this.state.right_width)+"vw"}
                    />
                </Row>
                <Row
                    zIndex={this.props.zIndex.views}
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
                        left_width={this.state.left_width}
                        enabled={this.props.enabled_components.left_menu()}
                        background_image={this.props.display_state.background_image}
                        update_background_image={this.props.update_background_image}
                    />
                    <ProjectDisplay
                        zIndices={this.props.zIndex.project_display}
                        enabled={this.props.enabled_components.project_display()}
                        project_metadata={this.props.project_metadata}
                        project_geometry={this.props.project_geometry}
                        update_project_geometry={this.props.update_project_geometry}
                        display_state={this.props.display_state}
                        width={100-this.state.left_width-this.state.right_width}
                        background_image={this.props.display_state.background_image}
                        update_background_image={this.props.update_background_image}
                        grid_mode={this.state.grid_mode}
                        swap_grid_mode={(new_grid_mode) => this.swap_grid_mode(new_grid_mode)}
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