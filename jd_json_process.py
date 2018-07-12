#!/usr/bin/python
# -*- coding: utf-8 -*-
# @Time    : 2018/7/11 14:38
# @Author  : Derek.S
# @Site    : 
# @File    : jd_json_process.py

import json, codecs, arrow, os

class json_process():
    def jd_json_price(self, jd_json_data):
        jd_data = json.loads(jd_json_data)
        return jd_data[0]["p"]

    def jd_json_product(self, js_json_data):
        jd_data = json.loads(js_json_data)
        trademark = jd_data["data"]["propGroups"][0]["atts"][5]["vals"][0]
        model = jd_data["data"]["propGroups"][0]["atts"][6]["vals"][0]
        name = trademark + " " + model
        print(name)

    def json_write(self, id, title, price):
        filename = id + ".json"
        with codecs.open(filename, "a+", encoding="utf-8") as file_json:
            if not os.path.getsize(filename):
                result_json = {
                    "id": id,
                    "title": title,
                    "price": [
                        {
                            "date": arrow.now().format("YYYY-MM-DD"),
                            "price": price
                        }
                    ]
                }
            else:
                file_json.seek(0)
                result_json = json.load(file_json, encoding="utf-8")
                new_price = {
                    "date": arrow.now().format("YYYY-MM-DD"),
                    "price": price
                }
                result_json["price"].append(new_price)
                file_json.seek(0)
                file_json.truncate()
            json.dump(result_json, file_json, ensure_ascii=False)


    def dateJson_write(self):
        with codecs.open("date.json", "w+", encoding="utf-8") as date_json:
            date = {
                "update": arrow.now().format("YYYY-MM-DD HH:mm:ss")
            }
            json.dump(date, date_json, ensure_ascii=False)