#!/usr/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2018/7/11 11:42
# @Author  : Derek.S
# @Site    : 
# @File    : jd_request.py

import requests

class jd_request:
    def request_page(self, id):
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
        }
        product_page_url = "https://item.jd.com/" + str(id) + ".html"
        fails = 0
        while fails <= 30:
            try:
                product_page_result = requests.get(product_page_url, headers=headers, timeout=10).text
                break
            except Exception as e:
                fails += 1

        return product_page_result

    def price_json(self, id):
        headers = {
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0_1 like Mac OS X) AppleWebKit/977.50 (KHTML, like Gecko) Mobile/BD61XJ MicroMessenger/6.6.6 NetType/WIFI Language/zh_CN"
        }
        price_url = "https://pe.3.cn/prices/mgets?skuids=" + str(id) + "&source=wxsq"
        fails = 0
        while fails <= 30:
            try:
                price_result = requests.get(price_url, headers=headers, timeout=10).text
                break
            except Exception as e:
                fails += 1

        # 商品参数获取
        # product_url = "https://wq.jd.com/commodity/itembranch/getspecification?callback=commParamCallBackA&skuid=" + str(id)
        # product_result = requests.get(product_url, headers=headers).text[19:-2]

        return price_result