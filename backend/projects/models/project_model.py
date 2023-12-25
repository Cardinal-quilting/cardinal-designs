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