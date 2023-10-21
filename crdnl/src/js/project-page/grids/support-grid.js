import Grid from "./grid";

import Row from "./row";

class SupportGrid extends Grid {
    constructor(props) {
        super(props);

        this.state = Object.assign(this.state, {
            left_width: 15, // units are in vw
        });
    }

    render() {
        // compute the widths of each column
        const [left_width, center_width, right_width] = this.column_widths();

        return (
            <Row
            left_border_color={this.state.left_border_color}
            right_border_color={this.state.right_border_color}
            set_left_border_color={this.set_left_border_color}
            set_right_border_color={this.set_right_border_color}
            left_width={this.state.left_width}
            right_width={this.state.right_width}
            set_left_width={this.set_left_width}
            set_right_width={this.set_right_width}
            height={this.props.height}                
            >
            <div 
            style={{
                minWidth: left_width, 
                maxWidth: left_width,
            }}
            >
                mini map
            </div>
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