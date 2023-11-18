import Grid from "./grid";

import Row from "./row";

import MiniMap from "./mini-map";

class SupportGrid extends Grid {
    render() {
        const center_width = String(this.center_width()) + "vw";
        const right_width = String(this.props.right_width) + "vw";

        const project_display_factor = Math.min(this.props.left_width/this.props.project_display_width, this.props.height/this.props.project_display_height);

        return (
            <Row
            left_border_color={this.state.left_border_color}
            right_border_color={this.state.right_border_color}
            set_left_border_color={this.set_left_border_color}
            set_right_border_color={this.set_right_border_color}
            left_width={this.props.left_width}
            right_width={this.props.right_width}
            set_left_width={this.props.set_left_width}
            set_right_width={this.props.set_right_width}
            height={this.props.height}                
            >
            <MiniMap
            settings={this.props.settings}
            project_info={this.props.project_info}
            project_settings={this.props.project_settings}
            width={this.props.left_width}
            height={String(this.props.height)+"vh"}
            project_display_factor={project_display_factor}
            />
            <div
            style={{ 
                minWidth: center_width, 
                maxWidth: center_width 
            }}
            >
                center bottom
            </div>
            <div
            style={{ 
                minWidth: right_width, 
                maxWidth: right_width 
            }}
            >
                mini graphic
            </div>
            </Row>
        );
    }
}

export default SupportGrid;