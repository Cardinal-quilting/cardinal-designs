import React, { Component } from "react";

import Button from "js/infrastructure/button";


class ProjectPage extends Component {
    render() {
        return (
            <div>
                <Button
                settings={this.props.settings}
                on_click={this.props.go_to_launch_page}
                >
                    Home
                </Button>
            </div>

        )
    }
}

export default ProjectPage;