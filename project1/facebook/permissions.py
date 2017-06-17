from rest_framework import permissions
from django.contrib.auth.models import User
from facebook.models import Group, Member, Follow

# project 2

class MusicListPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return user
    elif (request.method == 'POST'):
      return user
    else:
      return True

class MusicDetailPermission(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return user
    elif (request.method == 'DELETE'):
      return user
    elif (request.method == 'PUT'):
      return user
    else:
      return True

class DietdataDetailPermission(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return (user | (username == 'admin'))
    elif (request.method == 'DELETE'):
      return ((obj.author == request.user) | (username == 'admin'))
    elif (request.method == 'PUT'):
      return ((obj.author == request.user) | (username == 'admin'))
    else:
      return True

class DietdataPostPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return (user | (username == 'admin'))
    elif (request.method == 'POST'):
      return (user | (username == 'admin'))
    else:
      return True

class FollowListPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return user
    elif (request.method == 'POST'):
      return user
    else:
      return True

class FollowDetailPermission(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    if (request.method == 'GET'):
      return (obj.user == request.user)
    elif (request.method == 'DELETE'):
      return (obj.user == request.user)
    else:
      return True

class FollowArticlePermission(permissions.BasePermission):
  def has_permission(self, request, view):
    if (request.method == 'GET'):
      follow_pk = view.kwargs['pk']
      user      = Follow.objects.get(pk=follow_pk).user
      return (user == request.user)
    else:
      return True

class ProfilePermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    return user



class GroupNoticeListPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    admin    = ""
    admin_name = ""
    member   = False
    if user:
      admin  = Group.objects.get(pk=view.kwargs['pk']).admin
      admin_name = User.objects.get(username=admin).username
      member = Member.objects.filter(group=view.kwargs['pk']).filter(name=request.user).exists()
    if (request.method == 'GET'):
      return member
    elif (request.method == 'POST'):
      return (admin_name == username)
    else:
      return True

class GroupNoticeDetailPermission(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    admin    = ""
    admin_name = ""
    member   = False
    if user:
      admin  = Group.objects.get(pk=view.kwargs['pk']).admin
      admin_name = User.objects.get(username=admin).username
      member = Member.objects.filter(group=view.kwargs['pk']).filter(name=request.user).exists()
    if (request.method == 'GET'):
      return member
    elif (request.method == 'DELETE'):
      return (admin_name == username)
    else:
      return True

class GroupForumListPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    member   = False
    if user:
      member = Member.objects.filter(group=view.kwargs['pk']).filter(name=request.user).exists()
    if (request.method == 'GET'):
      return member
    elif (request.method == 'POST'):
      return member
    else:
      return True

class GroupForumDetailPermission(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    member   = False
    if user:
      member = Member.objects.filter(group=view.kwargs['pk']).filter(name=request.user).exists()
    if (request.method == 'GET'):
      return member
    elif (request.method == 'DELETE'):
      return (obj.author == request.user)
    else:
      return True

class GroupListPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return user
    elif (request.method == 'POST'):
      return user
    else:
      return True

class GroupDetailPermission(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return user
    elif (request.method == 'DELETE'):
      return (obj.admin == request.user)
    else:
      return True

class MemberPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return user
    elif (request.method == 'POST'):
      return user
    elif (request.method == 'DELETE'):
      return user
    else:
      return True

# project 1

class DetailDeletePutPermission(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return (user | (username == 'admin'))
    elif (request.method == 'DELETE'):
      return ((obj.author == request.user) | (username == 'admin'))
    elif (request.method == 'PUT'):
      return ((obj.author == request.user) | (username == 'admin'))
    else:
      return True

class ListPostPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return (user | (username == 'admin'))
    elif (request.method == 'POST'):
      return (user | (username == 'admin'))
    else:
      return True

class ChatPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return user
    else:
      return True

class UserPermission(permissions.BasePermission):
  def has_permission(self, request, view):
    username = request.user.username
    user     = User.objects.filter(username=username).exists()
    if (request.method == 'GET'):
      return user
    else:
      return True
