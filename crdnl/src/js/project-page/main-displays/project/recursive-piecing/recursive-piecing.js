import { Component } from "react";

import RecursivePiecingNode from "./node";
import RecursivePiecingLine from "./line";

class RecursivePiecing extends Component {
    render() {
        const [height, width] = this.props.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        const node_size = this.props.recursive_piecing_settings.node_size*Math.min(height, width);
        const line_thickness = this.props.recursive_piecing_settings.line_thickness*Math.min(height, width);

        return (
            <div
            style={{
                position: "relative",
                minWidth: width_px, 
                maxWidth: width_px,
                minHeight: height_px, 
                maxHeight: height_px,
                pointerEvents: "none",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
                {Object.entries(this.props.recursive_piecing_lines).map(([key, line]) => {
                    const start = this.props.recursive_piecing_nodes[line.start]
                    const end = this.props.recursive_piecing_nodes[line.end]

                    return (
                        <RecursivePiecingLine
                        key = {key}
                        start_point = {{x: start.x, y: start.y}}
                        end_point = {{x: end.x, y: end.y}}
                        project_height = {height}
                        project_width = {width}
                        thickness = {line_thickness}
                        color={this.props.recursive_piecing_settings.line_color}
                        />  );  
                })}  

                {Object.entries(this.props.recursive_piecing_nodes).map(([key, node]) => {
                    return (
                    <RecursivePiecingNode
                    key = {key}
                    x = {node.x}
                    y = {node.y}
                    project_height = {height}
                    project_width = {width}
                    size={node_size}
                    color={this.props.recursive_piecing_settings.node_color}
                    />  );  
                })}  
            </div>
        );
    }
}

export default RecursivePiecing;