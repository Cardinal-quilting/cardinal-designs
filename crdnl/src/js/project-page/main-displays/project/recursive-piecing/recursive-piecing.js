import { Component } from "react";

import RecursivePiecingNode from "./node";
import RecursivePiecingLine from "./line";

class RecursivePiecing extends Component {
    render() {
        const [height, width] = this.props.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        const node_size = this.props.recursive_piecing_settings.node_size*Math.min(height, width);

        return (
            <div
            style={{
                position: "absolute",
                minWidth: width_px, 
                maxWidth: width_px,
                minHeight: height_px, 
                maxHeight: height_px,
                pointerEvents: "none"
            }}
            >
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

                <RecursivePiecingLine
                />  
            </div>
        );
    }
}

export default RecursivePiecing;