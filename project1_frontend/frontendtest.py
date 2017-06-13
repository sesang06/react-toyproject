import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.support.select import Select

browser=webdriver.Chrome('/usr/local/bin/chromedriver')

browser.get('http://localhost:3000/')
a=0
i=20
while i<25+a:
    search=browser.find_element_by_id('register_id')
    search.clear()
    search.send_keys('test'+str(i))
    search=browser.find_element_by_id('register_pwd')
    search.clear()
    search.send_keys('q1w2e3r4t5y6')
    time.sleep(1)
    search=browser.find_element_by_id('register_idmessage')
    if search.text == "이미 존재하는 아이디입니다.":
        print("test{0}  already exists".format(i))
        a=a+1
        i=i+1
        continue
    search=browser.find_element_by_id('register_pwdcheck')
    search.clear()
    search.send_keys('q1w2e3r4t5y6')
    search=browser.find_element_by_id('register_email')
    search.clear()
    search.send_keys('test'+str(i)+'@naver.com')
    search=browser.find_element_by_id('register_submit')
    search.send_keys(Keys.RETURN)
    time.sleep(1)
    try:
        search=browser.find_element_by_id('register_welcome')
        search=browser.find_element_by_id('register_back')
        search.send_keys(Keys.RETURN)
    except NoSuchElementException:
        print("error in register")
        exit(1)
    search=browser.find_element_by_id('login_id')
    search.clear()
    search.send_keys('test'+str(i))
    search=browser.find_element_by_id('login_pwd')
    search.clear()
    search.send_keys('q1w2e3r4t5y6')
    search=browser.find_element_by_id('login_submit')
    search.send_keys(Keys.RETURN)

    # send chat
    for index in range(1,9):
      time.sleep(1)
      userlist =Select(browser.find_element_by_id("chat_userlist"))
      time.sleep(1)
      userlist.select_by_value(str(index))
      search=browser.find_element_by_id('chat_box')
      search.clear()
      search.send_keys('hello!')
      search=browser.find_element_by_id('chat_send')
      search.send_keys(Keys.RETURN)
    # end send chat

    time.sleep(1)
    try:
        search=browser.find_element_by_id('login_welcome')
        search=browser.find_element_by_id('logout')
        search.send_keys(Keys.RETURN)
    except NoSuchElementException:
        print("error in login")
        exit(1)
    i=i+1
browser.quit