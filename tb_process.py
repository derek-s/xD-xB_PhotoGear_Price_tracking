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

    url = "https://detailskip.taobao.com/service/getData/1/p1/item/detail/sib.htm?itemId=" + id + "&sellerId=186121147&modules=xmpPromotion,originalPrice"
    fails = 0
    while fails <= 30:
        try:
            r = requests.get(url, headers=headers, timeout=15)
            break
        except:
            fails += 1
    return r.json()


def tb_json_process(jsondata, sku, options):
    if options == "promotion":
        jsons = jsondata["data"]["promotion"]["promoData"]
        jsonKeys = jsons.keys()
        for each_key in jsonKeys:
            if sku in each_key:
                return jsons[each_key][0]["price"]
            else:
                return "0.00"
    elif options == "origin":
        jsons = jsondata["data"]["originalPrice"]
        jsonKeys = jsons.keys()
        for each_key in jsonKeys:
            if sku in each_key:
                print(jsons[each_key]["price"])
                return jsons[each_key]["price"]
            else:
                return "0.00"


def json_write(fname, lens_name, shop_id, shop_name, date, price, id):
    filename = "/home/jd_price_tracing/" + fname
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


def tb_main():
    with codecs.open("/home/jd_price_tracing/tb_id.txt", "r", encoding="utf-8") as tbtxt:
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
            tb_price = tb_json_process(tb_json, sku, "origin")
            date = arrow.now().format("YYYY-MM-DD")
            json_write(filename, lensName, shopID, shopName, date, tb_price, id)
            time.sleep(15)
    
    with codecs.open("/home/jd_price_tracing/wb_id.txt", "r", encoding="utf-8") as tbtxt:
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
            tb_price = tb_json_process(tb_json, sku, "promotion")
            date = arrow.now().format("YYYY-MM-DD")
            json_write(filename, lensName, shopID, shopName, date, tb_price, id)
            time.sleep(15)



