import NavigationBar from "js/infrastructure/navigation-bar";

import Button from "js/infrastructure/button";

import logo from "logos/CardinalQuiltsSmallLogo.png"

import "css/project-page/navigation-bar.css"

class ProjectPageNavigationBar extends NavigationBar {
    home_button() {
        return (
            <Button 
                settings={this.props.settings}
                on_click={this.props.go_to_launch_page}
                font_color={this.props.settings.font_color}
                disabled={this.props.disabled}
                >
                    Home
            </Button>
        );
    }

    render() { 
        return (
            <div className="project-page-navigation-bar"
            style={{
                backgroundColor: this.props.background_color,
                color: this.props.settings.font_color,
            }}
            >
                <img src={logo} className="logo" alt="logo"
                style={{
                    height: "3vh",
                    margin: "0.25vh 0.5vw 0.25vh 0.0vw", // top, right, bottom, left
                    opacity: (this.props.disabled? 0.1 : 1.0),
                    borderRadius: "1vmin"                    
                }}/>
                <div
                style={{
                    textAlign: "left",
                    width: "50%"
                }}
                >
                    {this.props.disabled? null : this.home_button()}
                </div>
                <div
                style={{
                    textAlign: "right",
                    width: "50%"
                }}
                >    
                    {this.props.disabled? null : this.settings_button()}
                </div>
            </div>
        );
    }
}

export default ProjectPageNavigationBar;
