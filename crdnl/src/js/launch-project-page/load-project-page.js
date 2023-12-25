import Page from "js/infrastructure/page";

import LaunchProjectNavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import Button from "js/infrastructure/button";

import axios from "axios"; 

class LoadProjectPage extends Page {
    constructor(props) {
        super(props);

        this.state = {
            display_delete_project_popup: false
        }

        this.delete_project = this.delete_project.bind(this);
    }

    async get_project_names() {
        await axios.get(`http://localhost:${this.props.backend_port}/get_project_names/`, ).then((value) =>{
            this.setState({
                projects: value.data
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if( prevState.display_delete_project_popup & !this.state.display_delete_project_popup) {
            this.get_project_names();
        }
    }

    componentDidMount() {
        this.get_project_names();
    }

    async delete_project() {
        // make sure to delete the project before updating the state so that it is gone when we get the projects again
        await this.props.delete_project(this.state.project.project_id);

        this.setState({
            project: undefined,
            display_delete_project_popup: false
        });
    }

    render_delete_project_popup() {
        return ( 
            <PopUp
            settings={this.props.settings}
            background_color={this.props.settings.dark_background_color}
            close_popup={() => {}}
            >   
                <div
                    style={{
                        maxWidth: "95vw",
                        display: "grid",
                        textAlign: "center",
                        fontSize: String(this.props.settings.font_size)+"vh",
                        color: this.props.settings.font_color,
                    }}
                >
                    <p style={{fontSize: String(this.props.settings.font_size)+"vmin"}}>Are you sure you want to delete the project</p>
                    {`${this.state.project.project_name}`}
                </div>
                    <Button
                        margin_top="2vh"
                        margin_right="2vw"
                        settings={this.props.settings}
                        on_click={this.delete_project}
                        disabled={this.state.project===undefined}
                    >
                        Delete
                    </Button>
                    <Button
                        margin_top="2vh"
                        margin_left="2vw"
                        settings={this.props.settings}
                        on_click={() => {this.setState({display_delete_project_popup: false})}}
                        disabled={this.state.project===undefined}
                    >
                        Cancel
                    </Button>
            </PopUp>
        );
    }

    render_load_project_popup(max_project_list_display_height) {
        return (
            <PopUp
            settings={this.props.settings}
            background_color={this.props.settings.dark_background_color}
            close_popup={() => {}}
            >   
                <div
                    style={{
                        display: "grid",
                        textAlign: "center",
                        fontSize: String(this.props.settings.font_size)+"vh",
                        color: this.props.settings.font_color,
                        maxHeight: String(max_project_list_display_height)+"vh",
                        overflowY: "auto"
                    }}
                >
                    <div style={{ marginBottom: "1vh", }}>
                        {this.state.projects===undefined? "Loading projects ..." : "Load project"}
                    </div>

                    <div
                    style={{
                        display: "grid",
                        textAlign: "left",
                        fontSize: String(this.props.settings.font_size)+"vmin",
                        color: this.props.settings.font_color,
                    }}
                    >
                    {this.state.projects===undefined? null : 
                    this.state.projects.map((p, index) => {
                        // determine if this project is currently selected
                        var selected = false;
                        if( this.state.project!==undefined ) {
                            selected = this.state.project.project_id===p.project_id
                        }

                        return (
                            <Button
                                key={p.project_id}
                                margin_top="0.1vh"
                                margin_left="1vw"
                                background_color={selected? this.props.settings.accent_background_color : this.props.settings.background_color}
                                settings={this.props.settings}
                                font_size={String(this.props.settings.font_size)+"vh"}
                                on_click={() => {this.setState({ project: p });}}
                            >
                                {p.project_name}
                            </Button>
                        );
                    })
                    }
                    </div>
                </div>
                    <Button
                        margin_top="2vh"
                        margin_left="1vw"
                        settings={this.props.settings}
                        on_click={() => this.props.load_project(this.state.project.project_id)}
                        disabled={this.state.project===undefined}
                        font_size={String(this.props.settings.font_size)+"vh"}
                    >
                        Load project
                    </Button>
                    <Button
                        margin_top="2vh"
                        margin_left="1vw"
                        settings={this.props.settings}
                        on_click={() => this.setState({ display_delete_project_popup: true })}
                        disabled={this.state.project===undefined}
                        font_size={String(this.props.settings.font_size)+"vh"}
                    >
                        Delete project
                    </Button>
                    <Button
                        margin_top="2vh"
                        margin_left="1vw"
                        settings={this.props.settings}
                        on_click={this.props.go_to_launch_page}
                        font_size={String(this.props.settings.font_size)+"vh"}
                    >
                        Home
                    </Button>
            </PopUp>
        );
    }

    render() {
        const background_color = this.background_color();
        const max_project_list_display_height = 80-(this.state.navbar_height===undefined?0:this.state.navbar_height);

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
            <LaunchProjectNavigationBar
                settings={this.props.settings}
                background_color={this.props.settings.dark_background_color}
                toggle_display_settings_form={this.toggle_display_settings_form}
                disabled={this.state.display_settings_form}
                go_to_launch_page={this.props.go_to_launch_page}
                set_navbar_height={(height) => {this.setState({ navbar_height: height })}}
            />
            <div
            style={{
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
            >
            { // the pop window to start new project or change the settings
                this.state.display_settings_form? this.render_settings() : 
                    (this.state.display_delete_project_popup? this.render_delete_project_popup() : this.render_load_project_popup(max_project_list_display_height))
            }
            </div>
        </div>
        );
    }
}

export default LoadProjectPage;