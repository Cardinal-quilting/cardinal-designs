class ProjectSettings {
    project_id = undefined;
    project_name = undefined;

    has_recursive_piecing = false;

    background_image_zoom = 1.0;
    background_image_opacity = 0.5;
    background_image_max_zoom = 5.0;
    background_image_wheel_sensitivity = 0.00025;
    background_image_translation = { x: 0, y: 0 }; // relative to the center of the project
    background_image_disable_movement = false;
    background_image_display = true;

    aspect_ratio = 1.0;

    project_display_zoom = 0.96;
    max_project_display_zoom = 5.0;
    project_display_zoom_wheel_sensitivity = 0.00025;
    disable_project_display_movement = false;

    project_display_translation = { x: 0, y: 0 }

    main_display = "Project";
}

export default ProjectSettings;