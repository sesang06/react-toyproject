from rest_framework import serializers
from facebook.models import Chatting
from django.contrib.auth.models import User
from facebook.models import Article
from facebook.models import Comment
from facebook.models import ArticleLike, CommentLike
from facebook.models import Group, Member, GroupNotice, GroupForum
from facebook.models import ImageArticle
from facebook.models import UserProfile
from facebook.models import Follow
from facebook.models import Dietdata

from django.db import models

# project 2

class DietdataSerializer(serializers.ModelSerializer):
  author= serializers.ReadOnlyField(source='author.username')
  dietdata= serializers.ReadOnlyField(source='dietdata.id')
  bmi = serializers.SerializerMethodField()
  def get_bmi(self,obj):
      height = obj.height
      weight = obj.weight
      return (weight / (height * height / 10000))

  class Meta:
    model= Dietdata
    fields =('id','author','created','height','weight','bmi','step','calorie','dietdata')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserProfile
        fields=('nickname','avatar')
#        extra_kwargs={'nickname':{'allow_null':True},'avatar':{'allow_null':True}}

class ArticleSerializer(serializers.ModelSerializer):
  userprofile= UserProfileSerializer(source='author.userprofile', read_only=True)
  author = serializers.ReadOnlyField(source='author.username')
  comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
  comments_count=serializers.SerializerMethodField()
  likes_count=serializers.SerializerMethodField()
  likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
  def get_comments_count(self,obj):
      count= Comment.objects.filter(article=obj).count()
      return count
  def get_likes_count(self,obj):
      count= ArticleLike.objects.filter(article=obj).count()
      return count

  class Meta:
    model = Article
    fields =('id', 'author','created','updated','comments','content', 'comments_count', 'likes', 'likes_count', 'userprofile')



class FollowSerializer(serializers.ModelSerializer):
  user   = serializers.ReadOnlyField(source='user.username')
  follow = serializers.SlugRelatedField(slug_field=User.USERNAME_FIELD, queryset=User.objects.all())

  class Meta:
    model  = Follow
    fields = ('id', 'user', 'follow',)

class ProfileSerializer(serializers.ModelSerializer):
  userprofile= UserProfileSerializer(required=False,partial=True)
  class Meta:
    model   = User
    fields  = ('id', 'username', 'password', 'email', 'userprofile', 'first_name','last_name','groups', 'is_staff','is_active','last_login','date_joined','is_superuser','user_permissions')
    extra_kwargs={'userprofile':{'allow_null':True} ,'password':{'write_only':True, 'allow_null':True} ,'is_staff':{'read_only':True},'user_permissions':{'read_only':True},'groups':{'read_only':True},'is_superuser':{'read_only':True},'is_active':{'read_only':True},'last_login':{'read_only':True},'date_joined':{'read_only':True},}
  def update(self, instance,validated_data):
      print(validated_data)
      if 'email' in validated_data:
          instance.email=validated_data.get('email')
      if  'password' in validated_data:
          print(validated_data['password'])
          if 'password'!= None and 'password'!= "":
              instance.set_password(validated_data['password'])
      if 'first_name' in validated_data:
          instance.first_name=validated_data.get('first_name')
      if 'last_name' in validated_data:
          instance.last_name=validated_data.get('last_name')


      if hasattr(instance,'userprofile') == False:
          profile=UserProfile.objects.create(
          user=instance,
          )
      if  'userprofile' in validated_data:
          profile_data=validated_data.get('userprofile')
          if 'nickname' in profile_data:
              instance.userprofile.nickname=profile_data.get('nickname')
          if 'avatar' in profile_data:
              instance.userprofile.avatar=profile_data.get('avatar')
          instance.userprofile.save()
      instance.save()
      return instance


class UserSerializer(serializers.ModelSerializer):
  userprofile= UserProfileSerializer(required=False, partial=True)
  class Meta:
    model   = User
    fields  = ('id', 'username', 'password', 'email', 'userprofile')
    extra_kwargs={'password':{'write_only':True}}
  def create(self, validated_data):
      user= User.objects.create_user(
      username=validated_data['username'],
      email=validated_data['email'],
      password=validated_data['password']
      )
      if 'userprofile' in validated_data:

          profile_data=validated_data.pop('userprofile')
          profile=UserProfile.objects.create(
          user=user)
          if 'nickname' in profile_data:
              profile.nickname=profile_data['nickname']
          if 'avatar' in profile_data:
              profile.avatar=profile_data['avatar']
          profile.save()
      return user
'''  def update(self, instance,validated_data):

      instance.email=validated_data.get('email',instance.email)
      instance.set_password(validated_data['password'])
      profile_data=validated_data.get('userprofile')
      if hasattr(instance,'userprofile') == False:
          profile=UserProfile.objects.create(
          user=instance,
          nickname=profile_data['nickname'],
          avatar=profile_data['avatar'],
          )
      else:
          instance.userprofile.nickname=profile_data.get('nickname',instance.userprofile.nickname)
          if profile_data.get('avatar')== None:
              pass
          else:
              instance.userprofile.avatar=profile_data.get('avatar',instance.userprofile.avatar)
          instance.userprofile.save()
      instance.save()
      return instance
'''
class ImageSerializer(serializers.ModelSerializer):
  author = serializers.ReadOnlyField(source='author.username')
#  comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
#  comments_count=serializers.SerializerMethodField()
#  likes_count=serializers.SerializerMethodField()
#  likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
#  def get_comments_count(self,obj):
#      count= Comment.objects.filter(article=obj).count()
#      return count
#  def get_likes_count(self,obj):
#      count= ArticleLike.objects.filter(article=obj).count()
#      return count
  class Meta:
    model = ImageArticle
    fields =('id', 'author','created','updated' , 'image')

#    fields =('id', 'author','created','updated','comments','content', 'comments_count', 'likes', 'likes_count', 'image')


class GroupSerializer(serializers.ModelSerializer):
  admin = serializers.ReadOnlyField(source='admin.username')
  member = serializers.SerializerMethodField('set_member')
  member_list = serializers.SerializerMethodField('set_member_list')

  def set_member(self, group):
    group_pk = group.id
    member_cnt = Member.objects.filter(group=group_pk).count()
    return member_cnt

  def set_member_list(self, group):
    group_pk = group.id
    members = Member.objects.values('name').filter(group=group_pk)
    li = []
    for i in members:
      user = User.objects.filter(id=i['name'])[0]
      li.append(user.username)
    return li

  class Meta:
    model   = Group
    fields  = ('id', 'created', 'admin', 'group_name', 'member', 'member_list',)

class MemberSerializer(serializers.ModelSerializer):
  name = serializers.ReadOnlyField(source='name.username')
  group = serializers.ReadOnlyField(source='group.id')

  class Meta:
    model   = Member
    fields  = ('id', 'group', 'name',)

class GroupNoticeSerializer(serializers.ModelSerializer):
  group = serializers.ReadOnlyField(source='group.id')

  class Meta:
    model   = GroupNotice
    fields  = ('id', 'created', 'group', 'notice',)

class GroupForumSerializer(serializers.ModelSerializer):
  group  = serializers.ReadOnlyField(source='group.id')
  author = serializers.ReadOnlyField(source='author.username')

  class Meta:
    model   = GroupForum
    fields  = ('id', 'created', 'group', 'author', 'text',)

# project 1

class ChattingSerializer(serializers.ModelSerializer):
  sender = serializers.ReadOnlyField(source='sender.username')
  receiver = serializers.SlugRelatedField(slug_field=User.USERNAME_FIELD, queryset=User.objects.all())

  class Meta:
    model   = Chatting
    fields  = ('id', 'created', 'sender', 'receiver', 'chat',)

class ChattingUserSerializer(serializers.ModelSerializer):
  class Meta:
    model   = User
    fields  = ('username',)


class UserDuplicateSerializer(serializers.ModelSerializer):
  class Meta:
    model   = User
    fields  = ('username',)

class UserLoginSerializer(serializers.ModelSerializer):
  class Meta:
    model   = User
    fields  = ('username',)

class CommentSerializer(serializers.ModelSerializer):
  author= serializers.ReadOnlyField(source='author.username')
  article= serializers.ReadOnlyField(source='article.id')
  likes_count=serializers.SerializerMethodField()
  likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
  def get_likes_count(self,obj):
      count= CommentLike.objects.filter(comment=obj).count()
      return count
  class Meta:
    model= Comment
    fields =('id','author','created','updated','content', 'article', 'likes', 'likes_count')

class ArticleLikeSerializer(serializers.ModelSerializer):
  author= serializers.ReadOnlyField(source='author.username')
  article= serializers.ReadOnlyField(source='article.id')

  class Meta:
    model= ArticleLike
    fields =('id','author','created','updated','article')


class CommentLikeSerializer(serializers.ModelSerializer):
  author= serializers.ReadOnlyField(source='author.username')
  comment= serializers.ReadOnlyField(source='comment.id')

  class Meta:
    model= CommentLike
    fields =('id','author','created','updated','comment')
