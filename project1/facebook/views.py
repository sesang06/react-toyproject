from facebook.models import Chatting
from facebook.models import Article
from facebook.models import Comment
from facebook.models import ArticleLike, CommentLike
from facebook.models import Group, Member, GroupNotice, GroupForum
from facebook.models import Follow
from facebook.models import Dietdata

from facebook.serializers import UserSerializer, UserDuplicateSerializer, UserLoginSerializer
from facebook.serializers import ChattingSerializer, ChattingUserSerializer
from facebook.serializers import ArticleSerializer, CommentSerializer
from facebook.serializers import ArticleLikeSerializer, CommentLikeSerializer
from facebook.serializers import GroupSerializer, MemberSerializer, GroupNoticeSerializer, GroupForumSerializer
from facebook.serializers import FollowSerializer
from facebook.serializers import DietdataSerializer

from facebook.permissions import UserPermission
from facebook.permissions import ChatPermission
from facebook.permissions import ListPostPermission, DetailDeletePutPermission
from facebook.permissions import GroupListPermission, GroupDetailPermission, MemberPermission
from facebook.permissions import GroupNoticeListPermission, GroupNoticeDetailPermission
from facebook.permissions import GroupForumListPermission, GroupForumDetailPermission
from facebook.permissions import ProfilePermission
from facebook.permissions import FollowListPermission, FollowDetailPermission, FollowArticlePermission
from facebook.permissions import DietdataDetailPermission, DietdataPostPermission

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import APIException
from rest_framework.response import Response

from facebook.serializers import ImageSerializer
from facebook.serializers import UserProfileSerializer
from facebook.serializers import ProfileSerializer
from facebook.models import ImageArticle

# project 2

class DietGraphList(generics.ListAPIView):
  serializer_class   = DietdataSerializer
  def get_queryset(self):
    user = get_object_or_404(User,username=self.kwargs['pk'])
    dietdata = Dietdata.objects.filter(author=user)
    return dietdata


class DietdataList(generics.ListCreateAPIView):
  serializer_class = DietdataSerializer
  permission_classes = (DietdataPostPermission, )

  def get_queryset(self):
    dietdata= Dietdata.objects.all()
    return dietdata
  def perform_create(self, serializer):
    serializer.save(author=self.request.user)

class DietdataDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Dietdata.objects.all()
  serializer_class = DietdataSerializer
  permission_classes = (DietdataDetailPermission, )


class WallList(generics.ListAPIView):
  serializer_class   = ArticleSerializer
  def get_queryset(self):
    print(self.kwargs['pk'])
    user = User.objects.filter(username=self.kwargs['pk'])
    article     = Article.objects.filter(author=user) | Article.objects.filter(comments__author=user) |Article.objects.filter(comments__likes__author=user) |Article.objects.filter(likes__author=user)

    return article


class FollowList(generics.ListCreateAPIView):
  serializer_class   = FollowSerializer
  permission_classes = (FollowListPermission,)

  def get_queryset(self):
    user   = self.request.user
    follow = Follow.objects.filter(user=user)
    return follow

  def perform_create(self, serializer):
    follow      = self.request.data['follow']
    follow_user = User.objects.filter(username=follow)[0]
    serializer.save(user=self.request.user, follow=follow_user)

class FollowDetail(generics.RetrieveDestroyAPIView):
  queryset           = Follow.objects.all()
  serializer_class   = FollowSerializer
  permission_classes = (FollowDetailPermission, )

class FollowArticleList(generics.ListAPIView):
  serializer_class   = ArticleSerializer
  permission_classes = (FollowArticlePermission, )

  def get_queryset(self):
    follow_pk   = self.kwargs['pk']
    follow      = Follow.objects.get(pk=follow_pk).follow
    follow_user = User.objects.filter(username=follow)[0]
    article     = Article.objects.filter(author=follow_user)
    return article

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = ProfileSerializer
#  def get_serializer(self, instance=None, data=None, many=False, partial=False):
#      if self.request.method=='PUT':
#          return UserSerializer(instance=instance,data=data,many=many,partial=True)
#      else:
#          return UserSerializer(instance=instance,data=data,many=many,partial=partial)
  def get_object(self):
      return get_object_or_404(User,pk=self.request.user.pk)

  def put(self,request,*args,**kwargs):
      return self.partial_update(request,*args,**kwargs)



class ImageList(generics.ListCreateAPIView):
  serializer_class= ImageSerializer
  def perform_create(self,serializer):
      serializer.save(author=self.request.user)
  def get_queryset(self):
    image= ImageArticle.objects.all()
    return image


class ImageDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = ImageArticle.objects.all()
  serializer_class = ImageSerializer

"""
class ArticleList(generics.ListCreateAPIView):
  serializer_class = ArticleSerializer
  permission_classes = (ListPostPermission, )

  def get_queryset(self):
    article= Article.objects.all()
    return article
  def perform_create(self, serializer):
    serializer.save(author=self.request.user)
"""

class GroupNoticeList(generics.ListCreateAPIView):
  serializer_class = GroupNoticeSerializer
  permission_classes = (GroupNoticeListPermission, )

  def get_queryset(self):
    group_pk = self.kwargs['pk']
    return GroupNotice.objects.filter(group=group_pk)

  def perform_create(self, serializer):
    group_pk = self.kwargs['pk']
    try:
      group = Group.objects.get(pk=group_pk)
    except Group.DoesNotExist:
      raise APIException('Group Does Not Exist') # HTTP 500 Internal Server Error
    serializer.save(group=group)

class GroupNoticeDetail(generics.RetrieveDestroyAPIView):
  serializer_class = GroupNoticeSerializer
  permission_classes = (GroupNoticeDetailPermission, )

  def get_queryset(self):
    group_pk = self.kwargs['group_pk']
    return GroupNotice.objects.filter(group=group_pk)

class GroupForumList(generics.ListCreateAPIView):
  serializer_class = GroupForumSerializer
  permission_classes = (GroupForumListPermission, )

  def get_queryset(self):
    group_pk = self.kwargs['pk']
    return GroupForum.objects.filter(group=group_pk)

  def perform_create(self, serializer):
    group_pk = self.kwargs['pk']
    try:
      group = Group.objects.get(pk=group_pk)
    except Group.DoesNotExist:
      raise APIException('Group Does Not Exist') # HTTP 500 Internal Server Error
    serializer.save(author=self.request.user, group=group)

class GroupForumDetail(generics.RetrieveDestroyAPIView):
  serializer_class = GroupForumSerializer
  permission_classes = (GroupForumDetailPermission, )

  def get_queryset(self):
    group_pk = self.kwargs['group_pk']
    return GroupForum.objects.filter(group=group_pk)

class GroupList(generics.ListCreateAPIView):
  queryset = Group.objects.all()
  serializer_class = GroupSerializer
  permission_classes = (GroupListPermission, )

  def perform_create(self, serializer):
    duplicate = Group.objects.filter(group_name=self.request.data['group_name']).exists()
    if duplicate:
      raise APIException('Same Group Name Already Exists') # HTTP 500 Internal Server Error
    serializer.save(admin=self.request.user)

class GroupDetail(generics.RetrieveDestroyAPIView):
  queryset = Group.objects.all()
  serializer_class = GroupSerializer
  permission_classes = (GroupDetailPermission, )

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((MemberPermission,))
def member_list(request, pk):
  try:
    group = Group.objects.get(pk=pk)
  except Group.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  members = Member.objects.filter(group=group)
  if request.method == 'GET':
    serializers = MemberSerializer(members, many=True)
    return Response(serializers.data)
  elif request.method == 'POST':
    duplicate = Member.objects.filter(group=group).filter(name=request.user).exists()
    if duplicate:
      return Response(status=status.HTTP_403_FORBIDDEN)
    serializers = MemberSerializer(data=request.data)
    if serializers.is_valid():
      serializers.save(name=request.user, group=group)
      return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_403_FORBIDDEN)
  elif request.method == 'DELETE':
    member = Member.objects.filter(group=group).filter(name=request.user)
    if member.count() == 0:
      return Response(status=status.HTTP_404_NOT_FOUND)
    member.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# project 1

@api_view(['GET','POST','DELETE'])
@permission_classes((ListPostPermission, ))
def article_like_list(request,pk):
  try:
    article=Article.objects.get(pk= pk)
  except Article.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  likes=ArticleLike.objects.filter(article=article)
  if request.method == 'GET':
    serializers = ArticleLikeSerializer(likes,many=True)
    return Response(serializers.data)
  elif request.method == 'POST':
    like=ArticleLike.objects.filter(article=article) & ArticleLike.objects.filter(author=request.user)
    if like.count() >= 1 :
      return Response(status=status.HTTP_403_FORBIDDEN)
    serializers = ArticleLikeSerializer(data=request.data)
    if serializers.is_valid():
      serializers.save(author=request.user, article=article)
      return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_403_FORBIDDEN)
  elif request.method == 'DELETE':
    like=ArticleLike.objects.filter(article=article) & ArticleLike.objects.filter(author=request.user)
    if like.count() ==0 :
      return Response(status=status.HTTP_404_NOT_FOUND)
    like.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET','POST','DELETE'])
@permission_classes((ListPostPermission, ))
def comment_like_list(request,article_pk,comment_pk):
  try:
    article=Article.objects.get(pk=article_pk)
    comment=Comment.objects.get(pk= comment_pk)
  except Article.DoesnotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  except Comment.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  likes=CommentLike.objects.filter(comment=comment)
  if request.method == 'GET':
    serializers = CommentLikeSerializer(likes,many=True)
    return Response(serializers.data)
  elif request.method == 'POST':
    like=CommentLike.objects.filter(comment=comment) & CommentLike.objects.filter(author=request.user)
    if like.count() >= 1 :
      return Response(status=status.HTTP_403_FORBIDDEN)
    serializers = CommentLikeSerializer(data=request.data)
    if serializers.is_valid():
      serializers.save(author=request.user, comment=comment)
      return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_403_FORBIDDEN)
  elif request.method == 'DELETE':
    like=CommentLike.objects.filter(comment=comment) & CommentLike.objects.filter(author=request.user)
    if like.count() ==0 :
      return Response(status=status.HTTP_404_NOT_FOUND)
    like.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Create your views
@api_view(['GET','POST'])
@permission_classes((ListPostPermission, ))
def comment_list(request,pk):
  try:
    article=Article.objects.get(pk= pk)
  except Article.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  comments=Comment.objects.filter(article=article)
  if request.method == 'GET':
    serializers = CommentSerializer(comments,many=True)
    return Response(serializers.data)
  elif request.method == 'POST':
    serializers = CommentSerializer(data=request.data)
    if serializers.is_valid():
      serializers.save(author=request.user, article=article)
      return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(['GET','PUT','DELETE'])
@permission_classes((DetailDeletePutPermission, ))
def comment_detail(request,article_pk,comment_pk):
  try:
    article=Article.objects.get(pk=article_pk)
    comment=Comment.objects.get(pk=comment_pk)
  except Article.DoesnotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  except Comment.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializers = CommentSerializer(comment)
    return Response(serializers.data)
  elif request.method == 'DELETE':
     comment.delete()
     return Response(status=status.HTTP_204_NO_CONTENT)
  elif request.method == 'PUT':
     serializers= CommentSerializer(comment,data=request.data)
     if serializers.is_valid():
       serializers.save()
       return Response(serializers.data)
     return Response(serializers.data, status=stutus.HTTP_400_BAD_REQUEST)

class ArticleList(generics.ListCreateAPIView):
  serializer_class = ArticleSerializer
  permission_classes = (ListPostPermission, )

  def get_queryset(self):
    article= Article.objects.all()
    return article
  def perform_create(self, serializer):
    serializer.save(author=self.request.user)

class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Article.objects.all()
  serializer_class = ArticleSerializer
  permission_classes = (DetailDeletePutPermission, )

class ChattingList(generics.ListCreateAPIView):
  permission_classes = (ChatPermission, )
  serializer_class = ChattingSerializer

  def get_queryset(self):
    user = self.request.user
    chat = Chatting.objects.filter(sender=user) | Chatting.objects.filter(receiver=user)
    return chat

  def perform_create(self, serializer):
    serializer.save(sender=self.request.user)

class ChattingUserList(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = ChattingUserSerializer

class UserList(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def perform_create(self, serializer):
#    userprofile= self.request.data.pop('userprofile')
    serializer= UserSerializer(data=self.request.data)
    if serializer.is_valid():
        serializer.save()

#    user = User.objects.create_user(username, password=password, email=email, userprofile=userprofile)
#    user.save()



class UserDetail(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
#  def get_serializer(self, instance=None, data=None, many=False, partial=False):
#      if self.request.method=='PUT':
#          return UserSerializer(instance=instance,data=data,many=many,partial=True)
#      else:
#          return UserSerializer(instance=instance,data=data,many=many,partial=partial)


class UserDuplicationCheck(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserDuplicateSerializer

  def perform_create(self, serializer):
    # Only check valid username
    # Not save request.data
    pass

class UserLogin(generics.ListAPIView):
  permission_classes = (UserPermission, )
  queryset = User.objects.all()
  serializer_class = UserLoginSerializer
