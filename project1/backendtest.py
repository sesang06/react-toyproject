#!/usr/bin/python3

import requests
from time import sleep

def get_or_error(link):
  sleep(0.05)
  try:
    res = requests.get(link)
    if res.status_code != 200:
      return None
    else:
      resjson = res.json()
      return resjson
  except Exception:
    print("ERROR: Cannot get {0}".format(link))
    exit(1)

def get_userlist_or_error(link):
  sleep(0.05)
  try:
    res = requests.get(link)
    if res.status_code != 200:
      print("ERROR: Cannot get userlist!")
      exit(1)
    else:
      resjson = res.json()
      return resjson
  except Exception:
    print("ERROR: Cannot get {0}".format(link))
    exit(1)

def get_chat_or_error(link, user, pwd):
  sleep(0.05)
  try:
    res = requests.get(link, auth=(user, pwd))
    if res.status_code != 200:
      print("ERROR: Cannot get chat!")
      exit(1)
    else:
      resjson = res.json()
      return resjson
  except Exception:
    print("ERROR: Cannot get {0}".format(link))
    exit(1)

def delete_or_error(link):
  sleep(0.05)
  try:
    res = requests.delete(link)
    if res.status_code != 204:
      print("ERROR: Cannot delete user!")
      exit(1)
  except Exception:
    print("ERROR: Cannot delete {0}".format(link))
    exit(1)

def post_or_error(link, user_info):
  sleep(0.05)
  try:
    res = requests.post(link, data=user_info)
    if res.status_code != 201:
      print("ERROR: Cannot sign up!")
      exit(1)
  except Exception:
    print("ERROR: Cannot post {0}".format(link))
    exit(1)

def post_chat_or_error(link, data, sender, pwd):
  sleep(0.05)
  try:
    res = requests.post(link, data=data, auth=(sender, pwd))
    if res.status_code != 201:
      print("ERROR: Cannot post chat!")
      exit(1)
  except Exception:
    print("ERROR: Cannot post {0}".format(link))
    exit(1)

def post_article_or_error(link, data, user, pwd):
  sleep(0.05)
  try:
    res = requests.post(link, data=data, auth=(user, pwd))
    if res.status_code != 201:
      print("ERROR: Cannot post article!")
      exit(1)
  except Exception:
    print("ERROR: Cannot post {0}".format(link))
    exit(1)

def get_article_or_error(link, user, pwd):
  sleep(0.05)
  try:
    res = requests.get(link, auth=(user, pwd))
    if res.status_code != 200:
      return None
    else:
      resjson = res.json()
      return resjson
  except Exception:
    print("ERROR: Cannot get {0}".format(link))
    exit(1)

def put_article_or_error(link, data, user, pwd):
  sleep(0.05)
  try:
    res = requests.put(link, data=data, auth=(user, pwd))
    if res.status_code != 200:
      return None
  except Exception:
    print("ERROR: Cannot put {0}".format(link))
    exit(1)

def post_comment_or_error(link, data, user, pwd):
  sleep(0.05)
  try:
    res = requests.post(link, data=data, auth=(user, pwd))
    if res.status_code != 201:
      print("ERROR: Cannot post comment!")
      exit(1)
  except Exception:
    print("ERROR: Cannot post {0}".format(link))
    exit(1)

def get_comment_or_error(link, user, pwd):
  sleep(0.05)
  try:
    res = requests.get(link, auth=(user, pwd))
    if res.status_code != 200:
      return None
    else:
      resjson = res.json()
      return resjson
  except Exception:
    print("ERROR: Cannot get {0}".format(link))
    exit(1)

def put_comment_or_error(link, data, user, pwd):
  sleep(0.05)
  try:
    res = requests.put(link, data=data, auth=(user, pwd))
    if res.status_code != 200:
      return None
  except Exception:
    print("ERROR: Cannot put {0}".format(link))
    exit(1)

def post_article_like_or_error(link, user, pwd):
  sleep(0.05)
  try:
    res = requests.post(link, auth=(user, pwd))
    if res.status_code != 201:
      print("Already Like: {0} / {1}".format(user, link))
  except Exception:
    print("ERROR: Cannot post {0}".format(link))
    exit(1)

def delete_article_like_or_error(link, user, pwd):
  sleep(0.05)
  try:
    res = requests.delete(link, auth=(user, pwd))
    if res.status_code != 204:
      print("No Like: {0} / {1}".format(user, link))
  except Exception:
    print("ERROR: Cannot delete {0}".format(link))
    exit(1)

def post_comment_like_or_error(link, user, pwd):
  sleep(0.05)
  try:
    res = requests.post(link, auth=(user, pwd))
    if res.status_code != 201:
      print("Already Like: {0} / {1}".format(user, link))
  except Exception:
    print("ERROR: Cannot post {0}".format(link))
    exit(1)

def delete_comment_like_or_error(link, user, pwd):
  sleep(0.05)
  try:
    res = requests.delete(link, auth=(user, pwd))
    if res.status_code != 204:
      print("No Like: {0} / {1}".format(user, link))
  except Exception:
    print("ERROR: Cannot delete {0}".format(link))
    exit(1)

def delete_comment_or_error(link, user, pwd):
  sleep(0.05)
  try:
    res = requests.delete(link, auth=(user, pwd))
    if res.status_code != 204:
      print("No permission: {0} / {1}".format(user, link))
  except Exception:
    print("ERROR: Cannot delete {0}".format(link))
    exit(1)

def delete_article_or_error(link, user, pwd):
  sleep(0.05)
  try:
    res = requests.delete(link, auth=(user, pwd))
    if res.status_code != 204:
      print("No permission: {0} / {1}".format(user, link))
  except Exception:
    print("ERROR: Cannot delete {0}".format(link))
    exit(1)

link = "http://13.124.72.170:8000/users/"
user_list = []

# 1. Get User
print("1. Checking Get User")
for i in range(1, 100):
  info = get_or_error(link + "{0}/".format(i))
  if not (info is None):
    user_list.append(i)
print("User List: {0}".format(user_list))

# 2. Delete User
print("2. Checking Delete User")
for i in range(0, len(user_list)):
  delete_or_error(link + "{0}/".format(user_list[i]))
print("Deleted!")

# 3. Create User
print("3. Checking Create User")
for i in range(1, 10):
  username  = "test{0}".format(i)
  email     = "test{0}@test.com".format(i)
  user_info = {'username': username, 'password': '1234abcd', 'email': email}
  post_or_error(link, user_info)
print("Created!")

link_userlist = "http://13.124.72.170:8000/chatting/userlist/"
link_chat = "http://13.124.72.170:8000/chatting/"

# 4. Get Chat Userlist
print("4. Checking Get Chat Userlist")
info = get_userlist_or_error(link_userlist)
print("Userlist: {0}".format(info))

# 5. Create Chat
print("5. Checking Create Chat")
for i in range(1, 10):
  for j in range(1, 10):
    sender   = "test{0}".format(i)
    pwd      = "1234abcd"
    receiver = "test{0}".format(j)
    chat     = "hi~"
    data     = {'receiver': receiver, 'chat': chat}
    if (i != j):
      post_chat_or_error(link_chat, data, sender, pwd) 
print("Created!")

# 6. Get Chat
print("6. Checking Get Chat")
for i in range(1, 10):
  user = "test{0}".format(i)
  pwd  = "1234abcd"
  get_chat_or_error(link_chat, user, pwd)
print("Success!")

link_article = "http://13.124.72.170:8000/article/"
article_list = []
comment_list = []

# 7. Post Article
print("7. Checking Post Article")
for i in range(1, 10):
  user    = "test{0}".format(i)
  pwd     = "1234abcd"
  content = "hello! I am test{0}".format(i)
  data    = {'content': content}
  post_article_or_error(link_article, data, user, pwd)
print("Success!")

# 8. Get Article
print("8. Checking Get Article")
for i in range(1, 100):
  user = "test1"
  pwd  = "1234abcd"
  info = get_article_or_error(link_article + "{0}/".format(i), user, pwd)
  if not (info is None):
    article_list.append(i)
print("Article List: {0}".format(article_list))

# 9. Put Article
print("9. Checking Put Article")
for i in range(0, len(article_list)):
  for j in range(1, 10):
    user    = "test{0}".format(j)
    pwd     = "1234abcd"
    content = "Have a nice day! by test{0}".format(j)
    data    = {'content': content}
    put_article_or_error(link_article + "{0}/".format(article_list[i]), data, user, pwd)
print("Success!")

# 10. Post Comment
print("10. Checking Post Comment")
for i in range(0, len(article_list)):
  user    = "test1"
  pwd     = "1234abcd"
  content = "good!"
  data    = {'content': content}
  post_comment_or_error(link_article + "{0}/comment/".format(article_list[i]), data, user, pwd)
print("Success!")

# 11. Get Comment
print("11. Checking Get Comment")
for i in range(1, 100):
  user = "test1"
  pwd  = "1234abcd"
  info = get_comment_or_error(link_article + "{0}/comment/{1}/".format(article_list[0], i), user, pwd)
  if not (info is None):
    comment_list.append(i)
print("Comment List: {0}".format(comment_list))

# 12. Put Comment
print("12. Checking Put Comment")
for i in range(0, len(comment_list)):
  for j in range(1, 10):
    user    = "test{0}".format(j)
    pwd     = "1234abcd"
    content = "hi~".format(j)
    data    = {'content': content}
    put_comment_or_error(link_article + "{0}/comment/{1}/".format(article_list[0], comment_list[i]), data, user, pwd)
print("Success!")

# 13. Post Article Like
print("13. Checking Post Article Like")
for i in range(0, len(article_list)):
  user   = "test1"
  pwd    = "1234abcd"
  post_article_like_or_error(link_article + "{0}/like/".format(article_list[i]), user, pwd)
print("Success!")

# 14. Delete Article Like
print("14. Checking Delete Article Like")
for i in range(0, len(article_list)):
  user = "test1"
  pwd  = "1234abcd"
  delete_article_like_or_error(link_article + "{0}/like/".format(article_list[i]), user, pwd)
print("Success!")

# 15. Post Comment Like
print("15. Checking Post Comment Like")
for i in range(0, len(comment_list)):
  user = "test1"
  pwd  = "1234abcd"
  post_comment_like_or_error(link_article + "{0}/comment/{1}/like/".format(article_list[0], comment_list[i]), user, pwd)
print("Success!")

# 16. Delete Comment Like
print("16. Checking Delete Comment Like")
for i in range(0, len(comment_list)):
  user = "test1"
  pwd  = "1234abcd"
  delete_comment_like_or_error(link_article + "{0}/comment/{1}/like/".format(article_list[0], comment_list[i]), user, pwd)
print("Success!")

# 17. Delete Comment
print("17. Checking Delete Comment")
for i in range(0, len(comment_list)):
  user = "test1"
  pwd  = "1234abcd"
  delete_comment_or_error(link_article + "{0}/comment/{1}/".format(article_list[0], comment_list[i]), user, pwd)
print("Success!")

# 18. Delete Article
print("18. Checking Delete Article")
for i in range(0, len(article_list)):
  user = "test1"
  pwd  = "1234abcd"
  delete_article_or_error(link_article + "{0}/".format(article_list[i]), user, pwd)
print("Success!")
