#!/usr/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2018/7/15 17:58
# @Author  : Derek.S
# @Site    : 
# @File    : tb_process.py

import time, json, requests, codecs, os, arrow


def tb_json_request(id):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
        "Referer": "https://item.taobao.com/item.htm?id=" + id
    }

    url = "https://detailskip.taobao.com/service/getData/1/p1/item/detail/sib.htm?itemId=" + id + "&sellerId=186121147&modules=originalPrice"

    r = requests.get(url, headers=headers)
    return r.json()


def tb_json_process(jsondata, sku):
    jsonKeys = jsondata["data"]["originalPrice"].keys()
    for each_key in jsonKeys:
        if sku in each_key:
            return jsondata["data"]["originalPrice"][each_key]["price"]


def json_write(fname, lens_name, shop_id, shop_name, date, price, id):
    filename = fname
    with codecs.open(filename, "a+", encoding="utf-8") as file_json:
        if not os.path.getsize(filename):
            result_json = {
                "lensName": lens_name,
                "id": str(fname).split(".")[0],
                "sub": {
                    shop_id: {
                        "shop_title": shop_name,
                        "price": [
                            {
                                "shop_title": shop_name,
                                "date": date,
                                "price": price
                            }
                        ]
                    }
                }
            }
        else:
            file_json.seek(0)
            result_json = json.load(file_json, encoding="utf-8")
            new_price = {
                "shop_title": shop_name,
                "date": date,
                "price": price
            }
            if str(shop_id) in result_json["sub"].keys():
                result_json["sub"][str(shop_id)]["price"].append(new_price)
            else:
                new_Shop = {
                        "shop_title": shop_name,
                        "price": [
                            {
                                "shop_title": shop_name,
                                "date": date,
                                "price": price
                            }
                        ]
                    }
                result_json["sub"][shop_id] = new_Shop
            file_json.seek(0)
            file_json.truncate()
        json.dump(result_json, file_json, ensure_ascii=False)


with codecs.open("tb_id.txt", "r", encoding="utf-8") as tbtxt:
    tb_id = tbtxt.readlines()
    for each_id in tb_id:
        idrow= each_id.split("\n")[0]
        id_subitem = idrow.split(",")
        id = id_subitem[0]
        shopName = id_subitem[1]
        sku = id_subitem[2]
        lensName = id_subitem[3]
        filename = id_subitem[4]
        shopID = id_subitem[5]
        tb_json = tb_json_request(id)
        tb_price = tb_json_process(tb_json, sku)
        date = arrow.now().format("YYYY-MM-DD")
        json_write(filename, lensName, shopID, shopName, date, tb_price, id)


