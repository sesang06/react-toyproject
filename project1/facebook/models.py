from django.db import models
from django.contrib.auth.models import User


from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

# In User Class, username & password & email
User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank   = False

# project 2

class Dietdata(models.Model):
  id       = models.AutoField(primary_key=True)
  created  = models.DateTimeField(auto_now_add=True)
  author   = models.ForeignKey('auth.User',null=True, related_name='dietdata', on_delete=models.CASCADE)
  height   = models.IntegerField(null=False)
  weight   = models.IntegerField(null=False)
  step     = models.IntegerField(null=False)
  calorie = models.IntegerField(null=False)
  class Meta:
    ordering = ('created', 'author', 'height', 'weight', 'step', 'calorie',)

class Follow(models.Model):
  id        = models.AutoField(primary_key=True)
  user      = models.ForeignKey('auth.User', null=False, related_name='follow_user', on_delete=models.CASCADE)
  follow    = models.ForeignKey('auth.User', null=False, related_name='follow_follow', on_delete=models.CASCADE)

  class Meta:
    ordering = ('user', )

class UserProfile(models.Model):
    user= models.OneToOneField(User, on_delete=models.CASCADE, related_name='userprofile')
    nickname= models.CharField(max_length=20, null=True)
    avatar= models.ImageField(upload_to='uploads/%Y/%m/%d/',max_length=255, null=True)
    class Meta:
        ordering=('user','nickname','avatar')
'''
@receiver(post_save, sender=User)
def create_user_userprofile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_userprofile(sender,instance, **kwargs):
    instance.userprofile.save()
'''
class ImageArticle(models.Model):
  id       = models.AutoField(primary_key=True)
  created  = models.DateTimeField(auto_now_add=True)
  updated  = models.DateTimeField(auto_now=True)
  author   = models.ForeignKey('auth.User', null=True, related_name='images', on_delete=models.CASCADE)
  image= models.ImageField(upload_to='uploads/%Y/%m/%d/',max_length=255, null=False)
  class Meta:
    ordering = ('id','created','updated','author', 'image')

class Group(models.Model):
  id         = models.AutoField(primary_key=True)
  created    = models.DateTimeField(auto_now_add=True)
  admin      = models.ForeignKey('auth.User', null=False, related_name='admin', on_delete=models.CASCADE)
  group_name = models.TextField(null=False)

  class Meta:
    ordering = ('created',)

class Member(models.Model):
  id       = models.AutoField(primary_key=True)
  group    = models.ForeignKey(Group, null=False, related_name='group', on_delete=models.CASCADE)
  name     = models.ForeignKey('auth.User', null=False, related_name='name', on_delete=models.CASCADE)

  class Meta:
    ordering = ('name',)

class GroupNotice(models.Model):
  id       = models.AutoField(primary_key=True)
  created  = models.DateTimeField(auto_now_add=True)
  group    = models.ForeignKey(Group, null=False, related_name='notice_group', on_delete=models.CASCADE)
  notice   = models.TextField(null=False)

  class Meta:
    ordering = ('created',)

class GroupForum(models.Model):
  id       = models.AutoField(primary_key=True)
  created  = models.DateTimeField(auto_now_add=True)
  group    = models.ForeignKey(Group, null=False, related_name='forum_group', on_delete=models.CASCADE)
  author   = models.ForeignKey('auth.User', null=False, related_name='forum_author', on_delete=models.CASCADE)
  text     = models.TextField(null=False)

  class Meta:
    ordering = ('created',)

# project 1

class Chatting(models.Model):
  id       = models.AutoField(primary_key=True)
  created  = models.DateTimeField(auto_now_add=True)
  sender   = models.ForeignKey('auth.User', null=True, related_name='sender', on_delete=models.CASCADE)
  receiver = models.ForeignKey('auth.User', null=True, related_name='receiver', on_delete=models.CASCADE)
  chat     = models.TextField(null=False)

  class Meta:
    ordering = ('created',)

class Article(models.Model):
  id       = models.AutoField(primary_key=True)
  created  = models.DateTimeField(auto_now_add=True)
  updated  = models.DateTimeField(auto_now=True)
  author   = models.ForeignKey('auth.User', null=True, related_name='articles', on_delete=models.CASCADE)
  content  = models.TextField(null=False)

  class Meta:
    ordering = ('created','updated','author','content')

class Comment(models.Model):
  id       = models.AutoField(primary_key=True)
  created  = models.DateTimeField(auto_now_add=True)
  updated  = models.DateTimeField(auto_now=True)
  author   = models.ForeignKey('auth.User',null=True, related_name='comments', on_delete=models.CASCADE)
  content  = models.TextField(null=False)
  article  = models.ForeignKey(Article,related_name='comments', on_delete=models.CASCADE)

  class Meta:
    ordering = ('created','updated','author','content','article')

class ArticleLike(models.Model):
  id      = models.AutoField(primary_key=True)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  author  = models.ForeignKey('auth.User',null=True, related_name='article_likes', on_delete=models.CASCADE)
  article  = models.ForeignKey(Article,related_name='likes', on_delete=models.CASCADE)

class CommentLike(models.Model):
  id      = models.AutoField(primary_key=True)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  author  = models.ForeignKey('auth.User',null=True, related_name='comment_likes', on_delete=models.CASCADE)
  comment  = models.ForeignKey(Comment,related_name='likes', on_delete=models.CASCADE)
