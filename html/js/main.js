$(document).ready(function(){
    var bodyfile = [
        "5017011.json", "1174341.json", "1230455.json"
    ]
    loadjson_jd(bodyfile)

    $.ajax({
        url: "date.json",
        type: "get",
        cache: false,
        success: function(data){
            updatetime = data["update"]
            $(".lastupdate").text(updatetime)
            $(".fbupdate-s").text(updatetime)
        }
    })

    var lensfile = [
        "2056545.json", "572705.json", "109075.json", "767952.json", "1359528.json", "4668073.json"
    ]

    var usedfile = [
        "sigma_17_50.json", "tokina_11_16.json"
    ]

    $("a.clens").bind("click", function(){
        $(this).parent().attr("class", "active")
        $("a.cbody").parent().removeAttr("class")
        $("a.userGear").parent().removeAttr("class")
        $("div.trackdata").empty()
        $("h1.h1info").text("镜头价格追踪总览")
        $("h1.h1info").append('<small class="smallinfo">尼康、腾龙镜头</small>')
        loadjson_jd(lensfile)
    })
    $("a.cbody").bind("click", function(){
        $(this).parent().attr("class", "active")
        $("a.clens").parent().removeAttr("class")
        $("a.userGear").parent().removeAttr("class")
        $("div.trackdata").empty()
        $("h1.h1info").text("机身价格追踪总览")
        $("h1.h1info").append('<small class="smallinfo">尼康全画幅机身</small>')
        loadjson_jd(bodyfile)
    })
    $("a.usedGear").bind("click", function(){
        $(this).parent().attr("class", "active")
        $("a.clens").parent().removeAttr("class")
        $("a.cbody").parent().removeAttr("class")
        $("div.trackdata").empty()
        $("h1.h1info").text("二手器材价格追踪总览")
        $("h1.h1info").append('<small class="smallinfo">尼康、适马、腾龙、图丽等品牌器材</small>')
        loadjson_tb(usedfile)
    })

})

function loadjson_jd(filelist) {
    for(bx in filelist){
        $.ajax({
            url: filelist[bx],
            type: "get",
            cache: false,
            success: function(data){
                var idname = data['id']
                trackdata = $("div.trackdata")
                trackdata.append("<h2 id=bodyname-"+ idname +"></h2>")
                trackdata.append('<table id=bodytable-'+ idname + ' data-toggle="table" data-height="300"></table>')
                trackdata.append('<canvas id=top-'+ idname +' width="400" height="100"></canvas>')
                $("#bodytable-" + idname).bootstrapTable({
                    columns:[{
                        title: "日期",
                        field: "date"
                    },{
                        title: "价格",
                        field: "price"
                    }]
                })
                $("#bodytable-" + idname).bootstrapTable("load", data["price"])
                $("#bodyname-" + idname).text(data["title"])
                topname = "top-" + idname
                zxtCheart(data, topname)
                trackdata.append("<div class=passone></div>")
            }
        })
    }
}


function loadjson_tb(filelist) {
    for(var cx in filelist){
        $.ajax({
            url: filelist[cx],
            type: "get",
            cache: false,
            success: function(data){
                var gearName = data["sub"]
                var idname = data["id"]
                var price_array = new Array()
                for(var dx in gearName){
                    var fx = gearName[dx]["price"]
                    for(var gx in fx){
                        price_array.push(fx[gx])
                    }
                }
                var price_array = JSON.parse(JSON.stringify(price_array))
                trackdata = $("div.trackdata")
                trackdata.append("<h2 id=bodyname-"+ idname +"></h2>")
                trackdata.append('<table id=bodytable-'+ idname + ' data-toggle="table" data-height="300" data-group-by="true" data-group-by-field="shop_title"></table>')
                trackdata.append('<canvas id=top-'+ idname +' width="400" height="100"></canvas>')
                $("#bodytable-" + idname).bootstrapTable({
                    columns:[{
                        title: "日期/价格",
                        field: "date"
                    },{
                        title: "价格",
                        field: "price"
                    }]
                })
                $("#bodytable-" + idname).bootstrapTable("load", price_array)
                $("#bodyname-" + idname).text(data["lensName"])
                topname = "top-" + idname
                zxtCheart_tb(data, topname)
                trackdata.append("<div class=passone></div>")
            }
        })
    }
}


function zxtCheart(data, cssselect){
    var date = new Array()
    var price = new Array()
    var price_array = data["price"]
    for (eachone in price_array){
        date.push(price_array[eachone]["date"])
        price.push(price_array[eachone]["price"])
    }
    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    }

    console.log(typeof(window.chartColors))

    var config = {
        type: "line",
        data: {
            labels: date,
            datasets: [{
                label: data["title"],
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: price,
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: data["title"] + ' 价格走势'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: '日期'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: '价格'
                    }
                }]
            }
        }
    }
        var ctx = document.getElementById(cssselect).getContext('2d');
        window.myLine = new Chart(ctx, config);
}


function zxtCheart_tb(data, cssselect){
    
    var sub = data["sub"]
    
    var config = {
        type: "line",
        data: {
            labels: date,
            datasets: []
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: data["lensName"] + ' 价格走势'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: '日期'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: '价格'
                    }
                }]
            }
        }
    }

    for(var dx in sub){
        var price = new Array()
        var date = new Array()
        var price_array = sub[dx]["price"]
        for(var eachone in price_array){
            price.push(price_array[eachone]["price"])
            date.push(price_array[eachone]["date"])
        }
        var Color = randomColor()
        var dataSet = {
            label: sub[dx]["shop_title"],
            backgroundColor: Color,
            borderColor: Color,
            data: price,
            fill: false
        }
        config["data"]["datasets"].push(dataSet)
    }

    config["data"]["labels"] = date
    
    var ctx = document.getElementById(cssselect).getContext('2d');
    window.myLine = new Chart(ctx, config);
}

function randomColor(){
    var Colors = [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
    ]

    var rColor = Colors[Math.round(Math.random() * 7)]
    console.log(rColor)
    return rColor
}