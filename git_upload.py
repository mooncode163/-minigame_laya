#!/usr/bin/python
# coding=utf-8
import zipfile
import shutil
import os
import os.path
import time
import datetime
import sys

import socket
 
 
# github 2021.8.13 开始命令行不能用密码登录,需要用个人令牌 个人访问令牌 https://docs.github.com/cn/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token
# 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
def upload():

    
    os.system("git config --global credential.helper store")
    os.system("git config --global user.email \"chyfemail163@163.com\"")
    os.system("git config --global user.name \"mooncode163\"")
    os.system("git config --global user.password \"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\"")
    
    os.system("git branch -al") 

    os.system("git add .")
    os.system("git commit -m \"ui\"")
    # os.system("git commit")  
    os.system("git push -u origin master")

   
 
# 主函数的实现
if __name__ == "__main__":

    upload() 

    print("git_upload end")
