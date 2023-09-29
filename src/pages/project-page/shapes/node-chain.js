import React, { Component } from "react";

import Point from "projects/geometry/point";
import Node from "pages/project-page/shapes/node";
import Line from "pages/project-page/shapes/line";

import 'styles/pages/project-page/shapes/node-chain.css';

import GridMode from "pages/project-page/project-grid/grid-mode";

class NodeChain extends Component {
    constructor(props) {
        super(props);

        console.log("node-chain", this.props.get_section(this.props.section).points);

        this.state = {
            base_line_color: "--black-theme",
            default_line_color: "--black-theme"
        }

        this.clicked_line = this.clicked_line.bind(this);
        this.on_mouse_move = this.on_mouse_move.bind(this);
        this.create_lines = this.create_lines.bind(this);
        this.split_section = this.split_section.bind(this);
        this.cancel_split_section = this.cancel_split_section.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if( this.state.new_point ) {
            document.addEventListener("mousemove", this.on_mouse_move);
            document.addEventListener("click", this.split_section);
            document.addEventListener("contextmenu", this.cancel_split_section);
        } else {
            document.removeEventListener("mousemove", this.on_mouse_move);
            document.removeEventListener("click", this.split_section);
            document.removeEventListener("contextmenu", this.cancel_split_section);
        }
    }

    cancel_split_section(event) {
        this.props.swap_grid_mode(GridMode.default);
    }

    split_section(event) {
        // return if there is no candidate point
        if( !this.state.candidate_point ) { return;  }
        
        console.log("node-chain.js", this.create_line(this.state.candidate_point, this.state.new_point) );

        this.props.split_section(this.props.section, this.state.candidate_point, this.state.new_point);
        this.setState({
            candidate_point: null,
            new_point: null
        })
        this.props.swap_grid_mode(GridMode.default);
    }

    on_mouse_move(event) {
        const display_info = this.props.get_display_info();
                
        // the location where we clicked
        const xe = Math.max(Math.min((event.clientX - display_info.left)/display_info.width, 1.0), 0.0);
        const ye = Math.max(Math.min((display_info.bottom - event.clientY)/display_info.height, 1.0), 0.0);

        const points = this.props.get_section(this.props.section).points;
        const potential = points.map( (p1, index, elements) => {
            const point1 = this.props.get_point(p1);
            const point2 = this.props.get_point(elements[++index%points.length]);

            // a vector that points along the line
            const v1 = point2.position.x - point1.position.x;
            const v2 = point2.position.y - point1.position.y;

            const l1 = xe-point1.position.x;
            const l2 = ye-point1.position.y;

            // scale*[v1, v2] + [x1, y1] is the location on the line where we clicked
            const scale = (v1*l1 + v2*l2)/(v1*v1 + v2*v2);

            // the coordinate on the line
            const x = scale*v1 + point1.position.x;
            const y = scale*v2 + point1.position.y;

            // return the point and the distance to where we clicked
            const diffx = x-xe, diffy = y-ye;
            return {position: {x: x, y: y}, dist: diffx*diffx + diffy*diffy, line_id: point1.id + "-" + point2.id};
        });
        const newloc = potential.reduce((smallest, current) => (smallest.dist<current.dist? smallest : current), potential[0]);

        //const candidate = new Point(newloc.position, undefined, undefined, (this.state.candidate_point===undefined? undefined : this.state.candidate_point.id))
        
        this.setState({
            candidate_point: undefined// (newloc.line_id===this.state.selected_line_id? undefined : candidate)
        });
    }

    clicked_line(x, y, id) {
        this.props.swap_grid_mode(GridMode.splitting_section);

        this.setState({
            new_point: new Point({x: x, y: y}, false),
            base_line_color: "--blue-theme",
            selected_line_color: "--red-theme",
            selected_line_id: id
        });
    }

    create_line(point1, point2) {
        const enabled = this.props.enabled===undefined? true : this.props.enabled;
        const id = point1.id + "-" + point2.id
        const color = (this.props.grid_mode===GridMode.splitting_section? this.state.selected_line_id===id? this.state.selected_line_color : this.state.base_line_color : this.state.default_line_color);

        return (
            <Line
                z_index={this.props.z_index}
                enabled={enabled}
                get_display_info = {this.props.get_display_info}
                aspect_ratio={this.props.aspect_ratio}
                display={this.props.display}
                point1={point1}
                point2={point2}
                click={(x, y, id) => this.clicked_line(x, y, id)}
                color={color}
                id={id}
                key={id}
            />
            );
    }

    create_lines() {
        const points = this.props.get_section(this.props.section).points;
        return points.map( (p1, index, elements) => {
            const point1 = this.props.get_point(p1);
            const point2 = this.props.get_point(elements[++index%points.length]);
            return this.create_line(point1, point2);
        });
    }

    create_node(point) {
        const enabled = this.props.enabled===undefined? true : this.props.enabled;

        return (
            <Node 
                z_index={this.props.z_index}
                get_display_info = {this.props.get_display_info}
                display={this.props.display}
                initial_pos={point.position}
                key={point.id}
                enabled={enabled}
                draggable={enabled && point.moveable}
            />
        );
    }

    create_nodes() {
        return this.props.get_section(this.props.section).points.map( (p) => {
            const point = this.props.get_point(p);

            return this.create_node(point);
        });
    }

    render() {
        const lines = this.create_lines();
        const nodes = this.create_nodes();

        return (
            <div
                className="node-chain"
            >                
                { lines.map( (l) => l) }
                { nodes.map( (d) => d) }       
                { this.state.new_point!==undefined & this.props.grid_mode===GridMode.splitting_section? this.create_node(this.state.new_point) : null }
                { this.state.candidate_point!==undefined & this.props.grid_mode===GridMode.splitting_section? this.create_node(this.state.candidate_point) : null }
            </div>
        );
    }
}

export default NodeChain;