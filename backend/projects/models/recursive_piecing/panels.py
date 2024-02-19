#from cachetools import cached

from django.db import models

from projects.models.recursive_piecing.recursive_piecing import RecursivePiecing

from projects.models.recursive_piecing.nodes import Node
from projects.models.recursive_piecing.lines import Line

class Panel(models.Model):
    recursive_piecing_project = models.ForeignKey(RecursivePiecing, on_delete=models.CASCADE, related_name="recursive_piecing_panels")

    nodes = models.ManyToManyField(Node)
    lines = models.ManyToManyField(Line)

    name = models.CharField(max_length=100)

    # if this is the top panel, this will be associated with the same project as recursive_piecing_project
    # if this is not the top panel, this will be null
    is_top_panel = models.OneToOneField(RecursivePiecing, on_delete=models.SET_NULL, null=True, blank=True, related_name="top_panel")

    # if this is the active panel, this will be associated with the same project as recursive_piecing_project
    # if this is not the active panel, this will be null
    is_active_panel = models.OneToOneField(RecursivePiecing, on_delete=models.SET_NULL, null=True, blank=True, related_name="active_panel")

    left_panel = models.OneToOneField("self", on_delete=models.SET_NULL, null=True, blank=True, related_name="left_panel_parent")
    right_panel = models.OneToOneField("self", on_delete=models.SET_NULL, null=True, blank=True, related_name="right_panel_parent")
    split_line = models.OneToOneField(Line, on_delete=models.SET_NULL, null=True, blank=True, related_name="split_panel")