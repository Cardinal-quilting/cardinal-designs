import { Component } from "react";

import DrawLine from "js/infrastructure/draw_line";

import TreeNode from "./tree_node";

class RecursivePiecingTreeDisplay extends Component {
    get project_dimensions() {
        const [parent_height, parent_width] = this.props.display_dimensions();
        return [parent_height-1.2*this.node_size, parent_width-1.2*this.node_size];
    }

    get node_size() {
        const [height, width] = this.props.display_dimensions();
        return this.props.recursive_piecing_settings.tree_node_size*Math.min(height, width);
    }

    display_tree_node(panel, x, y, x_child, y_child, dx_child, nodes, lines) {
        const [height, width] = this.project_dimensions;
        const line_thickness = this.props.recursive_piecing_settings.tree_line_thickness*Math.min(height, width);

        const node = (
            <TreeNode
                key={panel.name}
                color = {this.props.settings.dark_background_color}
                x = {x}
                y = {y}
                size = {this.node_size}
                project_height = {height}
                project_width = {width}
            />
        );

        const draw_line = (left_or_right) => {
            const line = (
                <DrawLine
                    key={`${left_or_right}_line_${panel.name}`}
                    start_point = {{x: x, y: y}}
                    end_point = {{x: x_child, y: y_child}}
                    project_height = {height}
                    project_width = {width}
                    thickness = {line_thickness}
                    color = {this.props.settings.dark_background_color}
                />
            );
            x_child += dx_child;
            return line;
        }

        if( panel.left_panel!==undefined ) {
            lines.push(draw_line("left"));
        }
        if( panel.right_panel!==undefined ) {
            lines.push(draw_line("right"))
        }

        // add the node to the list of nodes
        nodes.push(node);

        return x_child;
    }

    get tree_nodes() {
        // get a list of the panels on each level
        const panels_per_level = this.props.recursive_piecing_panels.recursive_piecing_tree();

        var nodes = [], lines = [];
        for( let level=0; level<panels_per_level.num_levels; level++ ) {
            const y = level/panels_per_level.num_levels, y_child = y + 1.0/panels_per_level.num_levels;
            const dx_child = 1.0/panels_per_level.num_panels_per_level[level+1];
            var x_child = 0.5*dx_child;
            for( let ind=0; ind<panels_per_level.num_panels_per_level[level]; ind++ ) {
                const x = (ind + 0.5)/panels_per_level.num_panels_per_level[level];
                x_child = this.display_tree_node(panels_per_level[level][ind], x, y, x_child, y_child, dx_child, nodes, lines);
            }

        }

        return [nodes, lines];
    }

    render() {
        const [height, width] = this.project_dimensions;

        const [nodes, lines] = this.tree_nodes;

        return ( 
                <div
                style={{
                    justifyContent: "center", 
                    alignItems: "center", 
                    display: "grid",
                    width: "100%",
                    height: "100%"

                }}
                >
                    <div
                    style={{
                        width: `${width}px`,
                        height: `${height}px`
                    }}
                    >
                    {lines}
                    {nodes}
                    </div>
            </div>
        );
    }
}

export default RecursivePiecingTreeDisplay