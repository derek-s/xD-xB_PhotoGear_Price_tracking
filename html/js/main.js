$(document).ready(function(){
    var bodyfile = [
        "5017011.json", "1174341.json", "1230455.json"
    ]
    loadjson(bodyfile)

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

    $("a.clens").bind("click", function(){
        $(this).parent().attr("class", "active")
        $("a.cbody").parent().removeAttr("class")
        $("div.trackdata").empty()
        $("h1.h1info").text("镜头价格追踪总览")
        $("h1.h1info").append('<small class="smallinfo">尼康、腾龙镜头</small>')
        loadjson(lensfile)
    })
    $("a.cbody").bind("click", function(){
        $(this).parent().attr("class", "active")
        $("a.clens").parent().removeAttr("class")
        $("div.trackdata").empty()
        $("h1.h1info").text("机身价格追踪总览")
        $("h1.h1info").append('<small class="smallinfo">尼康全画幅机身</small>')
        loadjson(bodyfile)
    })

})

function loadjson(filelist) {
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
    };
    var config = {
        type: "line",
        data: {
            labels: date,
            datasets: [{
                label: data["title"],
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
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