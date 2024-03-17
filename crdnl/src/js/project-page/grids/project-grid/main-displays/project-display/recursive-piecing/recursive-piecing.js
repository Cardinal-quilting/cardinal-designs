import React, { Component } from "react";

import RecursivePiecingNode from "./node";
import RecursivePiecingLine from "./line";

class RecursivePiecing extends Component {
    constructor(props) {
        super(props);

        this.select_panel = this.select_panel.bind(this);
        this.handle_mouse_down = this.handle_mouse_down.bind(this);
        this.mouse_move_split_panel = this.mouse_move_split_panel.bind(this);
        this.mouse_move_drag_new_node = this.mouse_move_drag_new_node.bind(this);
        this.render_active_panel_nodes = this.render_active_panel_nodes.bind(this);
        this.render_active_panel_lines = this.render_active_panel_lines.bind(this);
        this.has_start_node = this.has_start_node.bind(this);
        this.has_end_node = this.has_end_node.bind(this);

        this.ref = React.createRef();
        this.new_start_node_ref = React.createRef();
        this.new_end_node_ref = React.createRef();

        if( this.has_active() ) {
            const active_line_refs = this.props.recursive_piecing_settings.active_panel.lines.map(() => { return React.createRef(); })
            this.state = {
                active_line_refs: active_line_refs
            }
        } else {
            this.state = {};
        }
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
        const active_line_refs = selected_leaf.lines.map(() => { return React.createRef(); })
        this.setState({active_line_refs: active_line_refs});

        // set the active panel
        this.props.update_recursive_piecing_settings_element("active_panel", selected_leaf);
    }

    has_active() {
        return this.props.recursive_piecing_settings.active_panel!==undefined && this.props.recursive_piecing_settings.active_panel!==null
    }

    project_to_active_panel(x, y, skip_line_name=undefined) {
        if( !this.has_active() ) { return undefined; }

        var projected_point = Object.keys(this.state.active_line_refs).map(key => {
            const ref = this.state.active_line_refs[key];
            if( ref.current===null ) {
                return undefined;
            }

            var projected = ref.current.project_to_line(x, y);
            projected["line"] = this.props.recursive_piecing_settings.active_panel.lines[key];
            
            return projected;
        }).reduce((prev, curr) => {
            if( prev===undefined ) {
                return curr;
            }
            if( curr===undefined ) {
                return prev;
            }

            if( skip_line_name!==undefined ) {
                if( prev.line.name===skip_line_name ) { return curr; }
                if( curr.line.name===skip_line_name ) { return prev; }
            }
            return prev.distance<curr.distance ? prev : curr;
        });

        if( projected_point===undefined ) {
            return undefined;
        }

        const [height, width] = this.props.project_dimensions();

        // check if the point is close to the line endpoints 
        const snap_to_endpoint = (projected, endpoint) => {
            const diffx = width*(projected.point.x-endpoint.x), diffy = height*(projected.point.y-endpoint.y);
            const dist = Math.sqrt(diffx*diffx + diffy*diffy);

            if( 2.0*dist<this.node_radius ) {
                projected.line = undefined;
                projected.point = {x: endpoint.x, y: endpoint.y}
            }

            return projected;
        };

        // if a the point is close to one of the endpoints, snap to the end point
        projected_point = snap_to_endpoint(projected_point, projected_point.line.end);
        if( projected_point.line!==undefined ) {
            projected_point = snap_to_endpoint(projected_point, projected_point.line.start);
        }

        return projected_point;
    }

    // check to see if a candidate node to start a new line that splits a panal has been defined
    has_start_node() {
        return this.props.recursive_piecing_settings.new_start_node!==undefined && this.props.recursive_piecing_settings.new_start_node!==null;
    }

    // check to see if a candidate node to end a new line that splits a panal has been defined
    has_end_node() {
        return this.props.recursive_piecing_settings.new_end_node!==undefined && this.props.recursive_piecing_settings.new_end_node!==null;
    }

    handle_mouse_down(clickX, clickY) {
        // there is not an active panel
        if( this.state.active_line_refs===undefined ) {
            // return false because we are not moving a node
            return false;
        }

        const has_start = this.has_start_node(), 
              has_end = this.has_end_node();

        // we have clicked again but have a candidate line, so stop moving the end point and allow the user to drag the start and end
        if( has_start && has_end ) {
            this.ref.current.removeEventListener("mousemove", this.mouse_move_split_panel);

            // possibly drag the start node
            if( this.new_start_node_ref.current.has_clicked_node(clickX, clickY) ) {
                this.setState({ dragging_start: true, dragging_new: {
                    x: clickX - this.props.recursive_piecing_settings.new_start_node.point.x,
                    y: clickY - this.props.recursive_piecing_settings.new_start_node.point.y
                } });
                this.ref.current.addEventListener("mousemove", this.mouse_move_drag_new_node);

                // return true because we are moving a node
                return true;
            }

            // possibly drag the end node 
            if( this.new_end_node_ref.current.has_clicked_node(clickX, clickY) ) {
                this.setState({ dragging_start: false, dragging_new: {
                    x: clickX - this.props.recursive_piecing_settings.new_end_node.point.x,
                    y: clickY - this.props.recursive_piecing_settings.new_end_node.point.y
                } });
                this.ref.current.addEventListener("mousemove", this.mouse_move_drag_new_node);

                // return true because we are moving a node
                return true;
            }
        }

        // return false because we are not moving a node
        return false;
    }

    handle_click(clickX, clickY) {
        if( !this.has_active() ) {
            this.select_panel(clickX, clickY);
        }

        // there is an active panel
        if( this.state.active_line_refs!==undefined ) {
            const has_start = this.has_start_node(), 
                  has_end = this.has_end_node();

            // we do not have a candidate new line
            // we need to make sure that neither end point is created, if the user clicks twice without moving their mouse 
            // it is possible that we have a start but not an end node
            if ( !has_start && !has_end ) {
                const projection = this.project_to_active_panel(clickX, clickY);
                                
                if( projection!==undefined && projection.on_line ) {
                    this.props.update_recursive_piecing_settings_element("new_start_node", {point: projection.point, line: projection.line});
                    this.ref.current.addEventListener("mousemove", this.mouse_move_split_panel);
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
        const get_line_name = (line) => {
            return line===undefined? undefined : line.name;
        };
        const projection = this.project_to_active_panel(moveX, moveY, this.state.dragging_start? get_line_name(this.props.recursive_piecing_settings.new_end_node.line) : get_line_name(this.props.recursive_piecing_settings.new_start_node.line));

        const moved_node = {
            point: projection.point, 
            line: projection.line
        }

        // update the node location
        this.props.update_recursive_piecing_settings_element(this.state.dragging_start? "new_start_node" : "new_end_node", moved_node);
    }

    mouse_move_split_panel(event) {
        const [clickX, clickY] = this.props.transform_click_to_project_domain(event);
        const get_line_name = (line) => {
            return line===undefined? undefined : line.name;
        };
        const projection = this.project_to_active_panel(clickX, clickY, get_line_name(this.props.recursive_piecing_settings.new_start_node.line));
        this.props.update_recursive_piecing_settings_element("new_end_node", {point: projection.point, line: projection.line});
    }

    get node_scale() {
        const [height, width] = this.props.project_dimensions();
        return Math.min(height, width);
    }

    get node_radius() {
        return this.props.recursive_piecing_settings.node_size*this.node_scale;
    }

    render_node(point, color, key, ref=undefined) {
        const [height, width] = this.props.project_dimensions();

        return (
            <RecursivePiecingNode
                ref = {ref}
                key = {key}
                x = {point.x}
                y = {point.y}
                project_height = {height}
                project_width = {width}
                size = {this.node_radius}
                color = {color}
                on_mouse_down = {this.drag_new_node}
            />
        );
    }

    render_line(start, end, color, key, ref=undefined) {
        const [height, width] = this.props.project_dimensions();
        const line_thickness = this.props.recursive_piecing_settings.line_thickness*Math.min(height, width);

        return (
            <RecursivePiecingLine
            ref={ref}
            key={key}
            start_point = {{x: start.x, y: start.y}}
            end_point = {{x: end.x, y: end.y}}
            project_height = {height}
            project_width = {width}
            thickness = {line_thickness}
            color = {color}
            />  );  
    }

    render_active_panel_lines() {
        const active_panel = this.props.recursive_piecing_settings.active_panel;
        const color = this.props.recursive_piecing_settings.active_line_color;

        return Object.entries(active_panel.lines).map((line) => {
            const ref = this.state.active_line_refs===undefined? undefined : this.state.active_line_refs[line[0]];

            return this.render_line(line[1].start, line[1].end, color, `active_line${line[0]}`, ref);
        })
    }

    render_active_panel_nodes() {
        const active_panel = this.props.recursive_piecing_settings.active_panel;
        const color = this.props.recursive_piecing_settings.active_node_color;
        
        return Object.entries(active_panel.nodes).map((node) => {
            return this.render_node(node[1], color, `active_node${node[0]}`);
        })
    }

    render() {
        const [height, width] = this.props.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        const has_active = this.has_active();

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
                    return this.render_line(line.start, line.end, this.props.recursive_piecing_settings.line_color, key);
                })}  

                {Object.entries(this.props.recursive_piecing_nodes.nodes).map(([key, node]) => {
                    var color = this.props.recursive_piecing_settings.node_color;
                    return this.render_node(node, color, `node${key}`);
                })}  

                {has_active? this.render_active_panel_lines() : null}
                {has_active? this.render_active_panel_nodes() : null}

                {no_new_start_node || !has_active? null : this.render_node(
                    this.props.recursive_piecing_settings.new_start_node.point, 
                    this.props.recursive_piecing_settings.new_node_color, 
                    "new_node0", 
                    this.new_start_node_ref)}
                {no_new_end_node || !has_active? null : this.render_node(
                    this.props.recursive_piecing_settings.new_end_node.point, 
                    this.props.recursive_piecing_settings.new_node_color, 
                    "new_node1", 
                    this.new_end_node_ref)}
                {(no_new_start_node || no_new_end_node) || !has_active? null : this.render_line(
                    this.props.recursive_piecing_settings.new_start_node.point, 
                    this.props.recursive_piecing_settings.new_end_node.point, 
                    this.props.recursive_piecing_settings.new_line_color, 
                    "new_line")}
            </div>
        );
    }
}

export default RecursivePiecing;