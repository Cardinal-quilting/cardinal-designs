import ProjectPageNavigationBar from "./navigation-bar";

import ProjectGrid from "./grids/project-grid";
import SupportGrid from "./grids/support-grid";

import RowBorder from "./grids/row-border";

import Page from "js/infrastructure/page";

class ProjectPage extends Page {
    constructor(props) {
        super(props);

        this.state = Object.assign(this.state, {
            grid_border_color: this.props.settings.background_color,
            views_height: 5, // units are in vh
            support_grid_height: 25, // units are in vh
            project_grid_right_width: 15, // units are in vw
            project_grid_left_width: 15, // units are in vw
            support_grid_right_width: 15, // units are in vw
            support_grid_left_width: 20, // units are in vw
            navbar_height: undefined, // units are in vh

            // use these to force the window to reload on resize
            window_width: window.innerWidth,
            window_height: window.innerHeight
        });

        this.set_grid_border_color = this.set_grid_border_color.bind(this);
        this.set_support_grid_height = this.set_support_grid_height.bind(this);
        this.set_project_grid_left_width = this.set_project_grid_left_width.bind(this);
        this.set_project_grid_right_width = this.set_project_grid_right_width.bind(this);
        this.set_support_grid_left_width = this.set_support_grid_left_width.bind(this);
        this.set_support_grid_right_width = this.set_support_grid_right_width.bind(this);
        this.save_project = this.save_project.bind(this);
        this.handle_resize = this.handle_resize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handle_resize);  
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handle_resize);
    }

    handle_resize() { 
        // if the user resizes constantly this is pretty ineffient, but I expect it will be pretty rare
        this.setState({
            window_width: window.innerWidth,
            window_height: window.innerHeight
        }); 
    }

    set_project_grid_left_width(width) {
        this.setState({
            project_grid_left_width: Math.max(width, 3)
        });
    }

    set_project_grid_right_width(width) {
        this.setState({
            project_grid_right_width: Math.max(width, 3)
        });
    }

    set_support_grid_left_width(width) {
        this.setState({
            support_grid_left_width: Math.max(width, 3)
        });
    }

    set_support_grid_right_width(width) {
        this.setState({
            support_grid_right_width: Math.max(width, 3)
        });
    }

    set_grid_border_color(mouse_is_hovering) {
        this.setState({
            grid_border_color: (mouse_is_hovering? this.props.settings.accent_background_color : this.props.settings.background_color)
        })
    }

    set_support_grid_height(height) {
        this.setState({
            support_grid_height: Math.max(Math.min(95-this.state.views_height, height), 3.0)
        });
    }

    save_project() {
        if( this.props.project_settings.project_id===undefined | this.props.project_settings.project_name===undefined ) {
            this.props.save_project_as();
        } else {
            this.props.save_project();
        }
    }

    render() {
        const background_color = this.background_color();

        const project_grid_height = 100-(this.state.navbar_height===undefined?0:this.state.navbar_height)-0.25-this.state.support_grid_height;

        const display_grids = !this.state.display_settings_form;

        return (
            <div
            style={{
                backgroundColor: background_color,
                minHeight: "100vh",
                maxHeight: "100vh",
                minWidth: "100vw",
                maxWidth: "100vw",
            }}
            >
            <ProjectPageNavigationBar
                settings={this.props.settings}
                background_color={this.props.settings.dark_background_color}
                toggle_display_settings_form={this.toggle_display_settings_form}
                disabled={this.state.display_settings_form}
                go_to_launch_page={this.props.go_to_launch_page}
                save_project={this.save_project}
                save_project_as={this.props.save_project_as}
                return_navbar_height={this.state.navbar_height===undefined}
                set_navbar_height={(height) => {this.setState({ navbar_height: height })}}
            />
            <div
            style={{
                backgroundColor: background_color,
                display: "flex",
                flexDirection: "column", 
                alignItems: "center",
                textAlign: "center"
            }}
            >
            { display_grids?
                <div>
                <ProjectGrid
                    settings={this.props.settings}
                    project_settings={this.props.project_settings}
                    set_project_settings={this.props.set_project_settings}
                    update_project_settings_element={this.props.update_project_settings_element}
                    height={project_grid_height}
                    views_height={this.state.views_height} // units are in vh
                    left_width={this.state.project_grid_left_width} // units are in vw
                    right_width={this.state.project_grid_right_width} // units are in vw
                    set_left_width={this.set_project_grid_left_width}
                    set_right_width={this.set_project_grid_right_width}                    
                    recursive_piecing_settings={this.props.recursive_piecing_settings}
                    recursive_piecing_nodes={this.props.recursive_piecing_nodes}
                    recursive_piecing_lines={this.props.recursive_piecing_lines}
                    recursive_piecing_panels={this.props.recursive_piecing_panels}
                    initialize_recursive_piecing={this.props.initialize_recursive_piecing}
                    set_recursive_piecing_settings={this.props.set_recursive_piecing_settings}
                    update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                    split_active_recursive_piecing_panel={this.props.split_active_recursive_piecing_panel}
                />
                <RowBorder
                    color={this.state.grid_border_color}
                    set_color={this.set_grid_border_color}
                    current_height={this.state.support_grid_height}
                    set_height={this.set_support_grid_height}
                />
                <SupportGrid
                    settings={this.props.settings}
                    project_settings={this.props.project_settings}
                    height={this.state.support_grid_height}
                    left_width={this.state.support_grid_left_width} // units are in vw
                    right_width={this.state.support_grid_right_width} // units are in vw
                    set_left_width={this.set_support_grid_left_width}
                    set_right_width={this.set_support_grid_right_width}
                    project_display_width={99.5-this.state.project_grid_left_width-this.state.project_grid_right_width}
                    project_display_height={project_grid_height}
                    recursive_piecing_settings={this.props.recursive_piecing_settings}
                    recursive_piecing_nodes={this.props.recursive_piecing_nodes}
                    recursive_piecing_lines={this.props.recursive_piecing_lines}
                />
                </div> : null
            }
            { // the pop window to change the settings
                this.state.display_settings_form? this.render_settings() : null 
            }
            </div>
            </div>

        )
    }
}

export default ProjectPage;