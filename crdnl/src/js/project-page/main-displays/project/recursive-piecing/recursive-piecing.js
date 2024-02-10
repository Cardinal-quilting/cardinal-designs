import React, { Component } from "react";

import RecursivePiecingNode from "./node";
import RecursivePiecingLine from "./line";

class RecursivePiecing extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.select_panel = this.select_panel.bind(this);
        this.handle_mouse_down = this.handle_mouse_down.bind(this);
        this.mouse_move_split_panel = this.mouse_move_split_panel.bind(this);
        this.mouse_move_drag_new_node = this.mouse_move_drag_new_node.bind(this);

        this.ref = React.createRef();
        this.new_start_node_ref = React.createRef();
        this.new_end_node_ref = React.createRef();
    }

    componentDidUpdate() {
        if( this.props.recursive_piecing_settings.new_start_node===undefined && this.props.recursive_piecing_settings.new_end_node===undefined ) {
            this.ref.current.removeEventListener("mousemove", this.mouse_move_drag_new_node);
            this.ref.current.removeEventListener("mousemove", this.mouse_move_split_panel);
        }

        if( this.state.active_lines!==undefined && this.props.recursive_piecing_settings.active_panel===undefined ) {
            this.ref.current.removeEventListener("mousemove", this.mouse_move);
            this.setState({active_lines: undefined});
            this.props.update_recursive_piecing_settings_element("new_start_node", undefined);
            this.props.update_recursive_piecing_settings_element("new_end_node", undefined);
        }
    }

    select_panel(clickX, clickY) {
        const selected_leaf = this.props.recursive_piecing_panels.get_selected_panel(clickX, clickY);

        // get the active lines and create references to them
        var active_lines = {}
        selected_leaf.lines.forEach((line) => {
            active_lines[line.name] = React.createRef();
        });
        this.setState({active_lines: active_lines});

        // set the active panel
        this.props.update_recursive_piecing_settings_element("active_panel", selected_leaf.name);
    }

    project_to_active_panel(x, y, skip_line=undefined) {
        if( this.state.active_lines===undefined ) { return undefined; }

        return Object.keys(this.state.active_lines).map((key, index) => {
            var projected = this.state.active_lines[key].current.project_to_line(x, y);
            projected["line"] = key;
            return projected;
        }).reduce((prev, curr) => {
            if( skip_line!==undefined ) {
                if( prev.line===skip_line ) { return curr; }
                if( curr.line===skip_line ) { return prev; }
            }
            return prev.distance<curr.distance ? prev : curr;
        });
    }

    handle_mouse_down(clickX, clickY) {
        if( this.props.recursive_piecing_settings.active_panel===undefined ) {
            this.select_panel(clickX, clickY);
        }

        // there is an active panel
        if( this.state.active_lines!==undefined ) {
            // we do not have a candidate new line
            if( this.props.recursive_piecing_settings.new_start_node===undefined && this.props.recursive_piecing_settings.new_end_node===undefined ) {
                const projection = this.project_to_active_panel(clickX, clickY);
                                
                if( projection.on_line ) {
                    this.props.update_recursive_piecing_settings_element("new_start_node", {point: projection.point, line: projection.line});
                    this.ref.current.addEventListener("mousemove", this.mouse_move_split_panel);
                }
            // we have clicked again but have a candidate line, so stop moving the end point and allow the user to drag the start and end
            } else {
                this.ref.current.removeEventListener("mousemove", this.mouse_move_split_panel);

                // possibly drag the start node
                if( this.new_start_node_ref.current.has_clicked_node(clickX, clickY) ) {
                    this.setState({ dragging_start: true, dragging_new: {
                        x: clickX - this.props.recursive_piecing_settings.new_start_node.point.x,
                        y: clickY - this.props.recursive_piecing_settings.new_start_node.point.y
                    } });
                    this.ref.current.addEventListener("mousemove", this.mouse_move_drag_new_node);
                }

                // possibly drag the end node 
                if( this.new_end_node_ref.current.has_clicked_node(clickX, clickY) ) {
                    this.setState({ dragging_start: false, dragging_new: {
                        x: clickX - this.props.recursive_piecing_settings.new_end_node.point.x,
                        y: clickY - this.props.recursive_piecing_settings.new_end_node.point.y
                    } });
                    this.ref.current.addEventListener("mousemove", this.mouse_move_drag_new_node);
                }
             }
        }
    }

    handle_mouse_up() {
        this.ref.current.removeEventListener("mousemove", this.mouse_move_drag_new_node);
    }

    mouse_move_drag_new_node(event) {
        // shift by how far the mouse down was from the actual node location
        const [clickX, clickY] = this.props.transform_click_to_project_domain(event);
        const moveX = clickX - this.state.dragging_new.x, moveY = clickY - this.state.dragging_new.y;

        // project to the lines, but if we are dragging end don't project to the line with start and vice versa
        const projection = this.project_to_active_panel(moveX, moveY, this.state.dragging_start? this.props.recursive_piecing_settings.new_end_node.line : this.props.recursive_piecing_settings.new_start_node.line);

        // update the node location
        this.props.update_recursive_piecing_settings_element(this.state.dragging_start? "new_start_node" : "new_end_node", {point: projection.point, line: projection.line});
    }

    mouse_move_split_panel(event) {
        const [clickX, clickY] = this.props.transform_click_to_project_domain(event);
        const projection = this.project_to_active_panel(clickX, clickY, this.props.recursive_piecing_settings.new_start_node.line);
        this.props.update_recursive_piecing_settings_element("new_end_node", {point: projection.point, line: projection.line});
    }

    render_new_node(point, ref) {
        const [height, width] = this.props.project_dimensions();
        var color = this.props.recursive_piecing_settings.new_node_color;
        const node_size = this.props.recursive_piecing_settings.node_size*Math.min(height, width);

        return (
            <RecursivePiecingNode
                ref = {ref}
                x = {point.x}
                y = {point.y}
                project_height = {height}
                project_width = {width}
                size = {node_size}
                color = {color}
                on_mouse_down = {this.drag_new_node}
            />
        );
    }

    render_new_line(start, end) {
        const [height, width] = this.props.project_dimensions();
        var color = this.props.recursive_piecing_settings.new_line_color;
        const line_thickness = this.props.recursive_piecing_settings.line_thickness*Math.min(height, width);

        return (
            <RecursivePiecingLine
            start_point = {{x: start.x, y: start.y}}
            end_point = {{x: end.x, y: end.y}}
            project_height = {height}
            project_width = {width}
            thickness = {line_thickness}
            color = {color}
            />  );  
    }

    render() {
        const [height, width] = this.props.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        const node_size = this.props.recursive_piecing_settings.node_size*Math.min(height, width);
        const line_thickness = this.props.recursive_piecing_settings.line_thickness*Math.min(height, width);

        const active_panel = this.props.recursive_piecing_settings.active_panel;

        // check if we have a start or end node, undefined and null both signal that we do not 
        const no_new_start_node = this.props.recursive_piecing_settings.new_start_node===null || this.props.recursive_piecing_settings.new_start_node===undefined;
        const no_new_end_node = this.props.recursive_piecing_settings.new_end_node===null || this.props.recursive_piecing_settings.new_end_node===undefined;

        return (
            <div
            ref={this.ref}
            style={{
                position: "relative",
                minWidth: width_px, 
                maxWidth: width_px,
                width: width_px,
                minHeight: height_px, 
                maxHeight: height_px,
                pointerEvents: (this.props.disabled? "none" : "auto"),
            }}
            >
                {Object.entries(this.props.recursive_piecing_lines.lines).map(([key, line]) => {
                    if( !line.leaf_line ) {
                        return undefined;
                    }

                    return (
                        <RecursivePiecingLine
                        key = {key}
                        start_point = {{x: line.start.x, y: line.start.y}}
                        end_point = {{x: line.end.x, y: line.end.y}}
                        project_height = {height}
                        project_width = {width}
                        thickness = {line_thickness}
                        color = {this.props.recursive_piecing_settings.line_color}
                        />  
                    );  
                })}  

                {
                this.state.active_lines===undefined? null : 
                Object.keys(this.state.active_lines).map((line_name) => {
                    const line = this.props.recursive_piecing_lines.lines[line_name];

                    return (
                        <RecursivePiecingLine
                        key = {"active_"+line_name}
                        ref = {this.state.active_lines[line_name]}
                        start_point = {{x: line.start.x, y: line.start.y}}
                        end_point = {{x: line.end.x, y: line.end.y}}
                        project_height = {height}
                        project_width = {width}
                        thickness = {line_thickness}
                        color = {this.props.recursive_piecing_settings.active_line_color}
                        />  
                    );  
                })
                
                }


                {Object.entries(this.props.recursive_piecing_nodes.nodes).map(([key, node]) => {
                    var color = this.props.recursive_piecing_settings.node_color;
                    if( active_panel!==undefined & this.props.recursive_piecing_panels!==undefined ) {
                        color = !this.props.disabled & this.props.recursive_piecing_panels.panels[active_panel].includes_node(key)? 
                            this.props.recursive_piecing_settings.active_node_color : this.props.recursive_piecing_settings.node_color;
                    }

                    return (
                        <RecursivePiecingNode
                        key = {key}
                        x = {node.x}
                        y = {node.y}
                        project_height = {height}
                        project_width = {width}
                        size={node_size}
                        color={color}
                        />  );  
                })}  

                {no_new_start_node? null : this.render_new_node(this.props.recursive_piecing_settings.new_start_node.point, this.new_start_node_ref)}
                {no_new_end_node? null : this.render_new_node(this.props.recursive_piecing_settings.new_end_node.point, this.new_end_node_ref)}
                {no_new_start_node || no_new_end_node? null : this.render_new_line(this.props.recursive_piecing_settings.new_start_node.point, this.props.recursive_piecing_settings.new_end_node.point)}
            </div>
        );
    }
}

export default RecursivePiecing;