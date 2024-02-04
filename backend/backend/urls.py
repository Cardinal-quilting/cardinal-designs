"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from projects.views.project_views import (SaveProjectView, LoadProjectView, 
                                          DeleteProjectView, ProjectNamesView)
from projects.views.recursive_piecing_views import (SaveRecursivePiecingSettings, SaveRecursivePiecingNodes, SaveRecursivePiecingLines, SaveRecursivePiecingPanels,
                                                    LoadRecursivePiecing, LoadRecursivePiecingNodes, LoadRecursivePiecingLines, LoadRecursivePiecingPanels,
                                                    GetAllRecursivePiecingSettings, GetAllRecursivePiecingNodes, GetAllRecursivePiecingLines, GetAllRecursivePiecingPanels)

urlpatterns = [
    path("admin/", admin.site.urls),

    # project views
    path("save_project/", SaveProjectView.as_view(), name="save project"),
    path("load_project/<str:project_id>", LoadProjectView.as_view(), name="load project"),
    path("delete_project/<str:project_id>", DeleteProjectView.as_view(), name="delete project"),
    path("get_project_names/", ProjectNamesView.as_view(), name="get project names"),

    # recursive peicing views
    path("save_recursive_piecing_settings/<str:project_id>", SaveRecursivePiecingSettings.as_view(), name="save recursive piecing"),
    path("save_recursive_piecing_nodes/<str:project_id>", SaveRecursivePiecingNodes.as_view(), name="save recursive piecing nodes"),
    path("save_recursive_piecing_lines/<str:project_id>", SaveRecursivePiecingLines.as_view(), name="save recursive piecing lines"),
    path("save_recursive_piecing_panels/<str:project_id>", SaveRecursivePiecingPanels.as_view(), name="save recursive piecing panels"),
    path("load_recursive_piecing_settings/<str:project_id>", LoadRecursivePiecing.as_view(), name="load recursive piecing"),
    path("load_recursive_piecing_nodes/<str:project_id>", LoadRecursivePiecingNodes.as_view(), name="load recursive piecing nodes"),
    path("load_recursive_piecing_lines/<str:project_id>", LoadRecursivePiecingLines.as_view(), name="load recursive piecing lines"),
    path("load_recursive_piecing_panels/<str:project_id>", LoadRecursivePiecingPanels.as_view(), name="load recursive piecing panels"),
    path("get_recursive_piecing_settings/", GetAllRecursivePiecingSettings.as_view(), name="get recursive piecing components"),
    path("get_recursive_piecing_nodes/", GetAllRecursivePiecingNodes.as_view(), name="get all recursive piecing nodes"),
    path("get_recursive_piecing_nodes/<str:project_id>", GetAllRecursivePiecingNodes.as_view(), name="get recursive piecing nodes for a specific project"),
    path("get_recursive_piecing_lines/", GetAllRecursivePiecingLines.as_view(), name="get all recursive piecing lines"),
    path("get_recursive_piecing_lines/<str:project_id>", GetAllRecursivePiecingLines.as_view(), name="get recursive piecing lines for a specific project"),
    path("get_recursive_piecing_panels/", GetAllRecursivePiecingPanels.as_view(), name="get all recursive piecing panels"),
    path("get_recursive_piecing_panels/<str:project_id>", GetAllRecursivePiecingPanels.as_view(), name="get recursive piecing panels for a specific project"),
]
