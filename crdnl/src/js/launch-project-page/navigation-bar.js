import NavigationBar from "js/infrastructure/navigation-bar";

class LaunchProjectNavigationBar extends NavigationBar {
    render() { 
        return (
            <div
            ref={this.ref}
            style={{
                display: "flex",
                justifyContent: "center", 
                alignContent: "center",
                backgroundColor: this.props.background_color,
                color: this.props.settings.font_color
            }}
            >
                {this.render_logo()}
                <div
                style={{
                    textAlign: "left",
                    width: "50%"
                }}
                >
                    {this.props.disabled? null : this.home_button()}
                </div>
                {this.render_settings_button()}
            </div>
        );
    }
}

export default LaunchProjectNavigationBar;