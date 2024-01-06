from django.db import models

from projects.models.project_model import Project

class RecursivePiecing(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name="recursive_piecing")

    node_size = models.FloatField()
    min_node_size = models.FloatField()
    max_node_size = models.FloatField()

    node_color = models.CharField(max_length=7)

    line_thickness = models.FloatField()
    min_line_thickness = models.FloatField()
    max_line_thickness = models.FloatField()

    line_color = models.CharField(max_length=7)
