from django.db import models

from projects.models.project_model import Project

class RecursivePiecing(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name="recursive_piecing")

    # defines the diameter of each node to be this fraction of the project dimensions
    node_size = models.FloatField()

    # the min/max node sizes (node_size will always be between these values)
    min_node_size = models.FloatField()
    max_node_size = models.FloatField()

    # the color of the nodes 
    node_color = models.CharField(max_length=7)
    active_node_color = models.CharField(max_length=7)
    new_node_color = models.CharField(max_length=7)

    # the line thickness and their min/max values
    line_thickness = models.FloatField() # defines the thickness of each line to be this fraction of the project dimensions
    min_line_thickness = models.FloatField()
    max_line_thickness = models.FloatField()

    # the color of the lines 
    line_color = models.CharField(max_length=7)
    active_line_color = models.CharField(max_length=7)
    new_line_color = models.CharField(max_length=7)

    # proposed new nodes in the active panel
    new_start_node = models.JSONField(null=True)
    new_end_node = models.JSONField(null=True)

    # this is the next id for newly constructed nodes/lines/panels
    next_node_id = models.IntegerField()
    next_line_id = models.IntegerField()
    next_panel_id = models.IntegerField()