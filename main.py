#!/usr/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2018/7/11 12:27
# @Author  : Derek.S
# @Site    : 
# @File    : main.py

from jd_request import jd_request
from jd_json_process import json_process
from jd_soup import jd_page_procee
import codecs, time
from tb_process import tb_main

if __name__ == "__main__":
    jd_r = jd_request()
    jd_json_p = json_process()
    jd_soup = jd_page_procee()
    for each_id in codecs.open("id.txt", "r", encoding="utf-8").readlines():
        id = each_id.split("\n")[0]
        price_result = jd_r.price_json(id)
        product_page = jd_r.request_page(id)
        title = jd_soup.jd_title(product_page)
        price = jd_json_p.jd_json_price(price_result)
        jd_json_p.json_write(id, title, price)
        time.sleep(15)
    tb_main()
    jd_json_p.dateJson_write()
