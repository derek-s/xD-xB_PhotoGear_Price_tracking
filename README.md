# JD/TB_PhotoGear_Price_tracking

X东/X宝 商品价格数据爬虫

经常在无忌看贴，发现每当新摄影器材出现，有兴趣的人总会开一个价格追踪贴，收集互联网电商以及器材城销售商的价格，但当器材价格平稳之后便无人再做更新。

虽然有历史价格查询网站，还是自己针对自己的需求造个轮子好了。

没有对广泛商品进行适配，自用代码。

## 使用

### X东

需要将X东的商品信息页面url内的数字部分，一行一个写入 `id.txt`

如： https://item.xd.com/5017011.html ，则将5017011写入 `id.txt` 文件

### X宝

X宝麻烦一点，X宝的商品id文件 `tb_id.txt`

内容如下：

```
42317879041,上海港海数码总店,29029:101490;1627207:1831936907,图丽11-16 一代,tokina_11_16.json,kj69668
```

说明

```
商品页面url内 "id=" 后面数字部分，店铺名称,器材卡口套餐数据,器材中文名称,器材json文件名,店铺ID
```

由于器材json文件名和店铺ID要用来在代码中使用，请使用全英文字符串。

### 环境及运行方法

#### 依赖库及Python版本

##### Python版本

开发环境 Python 3.6

运行环境 Python 3.5

##### 依赖库

```
requests, arrow, BeautifulSoup
```

请自行解决依赖问题。

### 运行

```
python main.py
```

需要单独运行X东的，请注释 `main.py` 第 26 行
需要单独运行X宝的，请注释 `main.py` 第 15-25 行

## 前端显示

临时用`JQuery`、`Bootstrap`、`Bootstrap-Table`、`Bootstrap-Table-Group-by-V2`、`Chart.js`，临时撸了一个前端显示方案，可以在html目录内查看，未push库，可以根据 `index.html` 内源码找到加载地址。自行解决即可。

在线演示：https://ddemo.xyz/photogear/
