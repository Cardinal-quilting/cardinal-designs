import NavigationBar from "js/infrastructure/navigation-bar";

import Button from "js/infrastructure/button";

import "css/project-page/navigation-bar.css"

class ProjectPageNavigationBar extends NavigationBar {
    save_button() {
        return (
            <Button 
                settings={this.props.settings}
                on_click={this.props.save_project}
                font_color={this.props.settings.font_color}
                font_size={String(this.props.settings.font_size)+"vh"}
                disabled={this.props.disabled}
                >
                    Save
            </Button>
        );
    }

    save_as_button() {
        return (
            <Button 
                settings={this.props.settings}
                on_click={this.props.save_project_as}
                font_color={this.props.settings.font_color}
                font_size={String(this.props.settings.font_size)+"vh"}
                disabled={this.props.disabled}
                >
                    Save As
            </Button>
        );
    }

    render() { 
        return (
            <div className="project-page-navigation-bar"
            style={{
                backgroundColor: this.props.background_color,
                color: this.props.settings.font_color,
                maxWidth: "100vw",
                minWidth: "100vw",
                overflowY: "scroll",
                overflowX: "hidden"
            }}
            >
                {this.render_logo()}
                <div
                style={{
                    textAlign: "left",
                    width: "50vw"
                }}
                >
                    {this.props.disabled? null : this.home_button()}
                    {this.props.disabled? null : this.save_as_button()}
                    {this.props.disabled? null : this.save_button()}
                </div>
                {this.render_settings_button()}
            </div>
        );
    }
}

export default ProjectPageNavigationBar;
