$(document).ready(function(){
    var bodyfile=[
        "5017011.json","1230455.json"
    ]
    $.ajax({
        url: bodyfile[0],
        type: "get",
        success: function(data){
            $("#bodytable").bootstrapTable("load", data["price"])
            $("#bodyname_d850").text(data["title"])
            zxtCheart(data, "top_d850")
        }
    })
    $("#bodytable").bootstrapTable({
        columns:[{
            title: "日期",
            field: "date"
        },{
            title: "价格",
            field: "price"
        }]
    })
})

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
                text: data["title"] + '价格走势'
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
                        display: true,
                        labelString: '日期'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '价格'
                    }
                }]
            }
        }
    }
    window.onload = function() {
        var ctx = document.getElementById(cssselect).getContext('2d');
        window.myLine = new Chart(ctx, config);
    };
}