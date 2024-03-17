from django.db import models

class Project(models.Model):
    project_name = models.CharField(max_length=1000)

    has_recursive_piecing = models.BooleanField()

    background_image_zoom = models.FloatField()
    background_image_opacity = models.FloatField()
    background_image_max_zoom = models.FloatField()
    background_image_wheel_sensitivity = models.FloatField()
    background_image_translation = models.JSONField()
    background_image_disable_movement = models.BooleanField()
    background_image_display = models.BooleanField()

    aspect_ratio = models.FloatField()

    project_display_zoom = models.FloatField()
    max_project_display_zoom = models.FloatField()
    project_display_zoom_wheel_sensitivity = models.FloatField()
    disable_project_display_movement = models.BooleanField()

    project_display_translation = models.JSONField()

    main_display = models.CharField(max_length=250)
