#!/usr/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2018/7/11 15:22
# @Author  : Derek.S
# @Site    : 
# @File    : jd_soup.py

from bs4 import BeautifulSoup as bs
import re

class jd_page_procee:
    def jd_title(self, page_source):
        soup = bs(page_source, "html.parser")
        title = soup.title.get_text()
        pattern = re.compile(r"】.*【")
        result = pattern.findall(title)
        return result[0][1:-1]
