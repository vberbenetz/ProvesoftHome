jQuery(document).ready(function() {


    // Setup data
    var onTimeDelivery = {
            name: 'On Time Delivery',
                data: [81, 74, 76, 79, 87, 80, 82, 86, 89, 93, 92, 95]
        },

        quality = {
        name: 'Quality',
            data: [89, 88, 82, 79, 87, 91, 93, 92, 95, 93, 97, 99]
        },

        capacity = {
            name: 'Capacity',
            data: [67, 72, 73, 69, 71, 70, 62, 75, 77, 80, 75, 82]
        };


    // -------------------------------
    // Updating consumables line chart

    $('#hcUpdatingLine').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.round(Math.random() * 100);
                        series.addPoint([x, y], true, true);

                        $("#consumedScore").text(y);

                    }, 3000);
                }
            }
        },
        title: {
            style: {
                "display": "none"
            }
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Number Of Items'
            },
            min: 0,
            max: 100,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ': ' + '</b>' + Highcharts.numberFormat(this.y, 2) + '<br/>' +
                    '<b>Timestamp: </b>' + Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>';
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Items Consumed',
            data: (function () {

                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 3000,
                        y: Math.round(Math.random() * 100)
                    });
                }
                return data;
            }())
        }],
        credits: {
            enabled: false
        }
    });

    // ---------------------------
    // Monthly Scores By Category

    $('#hcSpline').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            style: {
                "display": "none"
            }
        },
        xAxis: {
            categories: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
        },
        yAxis: {
            title: {
                text: 'Monthly Score (%)'
            },
            min: 0,
            max: 100,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotBands: [{ // Below Standards
                from: 0,
                to: 50,
                color: 'rgba(255, 0, 0, 0.05)',
                label: {
                    text: 'Below Standards',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Acceptable
                from: 51,
                to: 75,
                color: 'rgba(255, 255, 0, 0.05)',
                label: {
                    text: 'Acceptable',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Exceptional
                from: 76,
                to: 100,
                color: 'rgba(0, 255, 0, 0.05)',
                label: {
                    text: 'Exceptional',
                    style: {
                        color: '#606060'
                    }
                }
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: [
            onTimeDelivery,
            quality,
            capacity
        ],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        },
        credits: {
            enabled: false
        }
    });


    // ------------------------
    // Total Monthly Scores


    var monthlyTotals = [
            {
                name: 'January',
                y: (onTimeDelivery.data[0] + quality.data[0] + capacity.data[0]) / 3,
                drilldown: 'january'
            },
            {
                name: 'February',
                y: (onTimeDelivery.data[1] + quality.data[1] + capacity.data[1]) / 3,
                drilldown: 'february'
            },
            {
                name: 'March',
                y: (onTimeDelivery.data[2] + quality.data[2] + capacity.data[2]) / 3,
                drilldown: 'march'
            },
            {
                name: 'April',
                y: (onTimeDelivery.data[3] + quality.data[3] + capacity.data[3]) / 3,
                drilldown: 'april'
            },
            {
                name: 'May',
                y: (onTimeDelivery.data[4] + quality.data[4] + capacity.data[4]) / 3,
                drilldown: 'may'
            },
            {
                name: 'June',
                y: (onTimeDelivery.data[5] + quality.data[5] + capacity.data[5]) / 3,
                drilldown: 'june'
            },
            {
                name: 'July',
                y: (onTimeDelivery.data[6] + quality.data[6] + capacity.data[6]) / 3,
                drilldown: 'july'
            },
            {
                name: 'August',
                y: (onTimeDelivery.data[7] + quality.data[7] + capacity.data[7]) / 3,
                drilldown: 'august'
            },
            {
                name: 'September',
                y: (onTimeDelivery.data[8] + quality.data[8] + capacity.data[8]) / 3,
                drilldown: 'september'
            },
            {
                name: 'October',
                y: (onTimeDelivery.data[9] + quality.data[9] + capacity.data[9]) / 3,
                drilldown: 'october'
            },
            {
                name: 'November',
                y: (onTimeDelivery.data[10] + quality.data[10] + capacity.data[10]) / 3,
                drilldown: 'november'
            },
            {
                name: 'December',
                y: (onTimeDelivery.data[11] + quality.data[11] + capacity.data[11]) / 3,
                drilldown: 'december'
            }
        ],
        monthlyBreakDown = [
            {
                id: 'january',
                name: 'January Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[0]],
                    ['Quality', quality.data[0]],
                    ['Capacity', capacity.data[0]]
                ]
            },
            {
                id: 'february',
                name: 'February Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[1]],
                    ['Quality', quality.data[1]],
                    ['Capacity', capacity.data[1]]
                ]
            },
            {
                id: 'march',
                name: 'March Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[2]],
                    ['Quality', quality.data[2]],
                    ['Capacity', capacity.data[2]]
                ]
            },
            {
                id: 'april',
                name: 'April Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[3]],
                    ['Quality', quality.data[3]],
                    ['Capacity', capacity.data[3]]
                ]
            },
            {
                id: 'may',
                name: 'May Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[4]],
                    ['Quality', quality.data[4]],
                    ['Capacity', capacity.data[4]]
                ]
            },
            {
                id: 'june',
                name: 'June Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[5]],
                    ['Quality', quality.data[5]],
                    ['Capacity', capacity.data[5]]
                ]
            },
            {
                id: 'july',
                name: 'July Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[6]],
                    ['Quality', quality.data[6]],
                    ['Capacity', capacity.data[6]]
                ]
            },
            {
                id: 'august',
                name: 'August Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[7]],
                    ['Quality', quality.data[7]],
                    ['Capacity', capacity.data[7]]
                ]
            },
            {
                id: 'september',
                name: 'September Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[8]],
                    ['Quality', quality.data[8]],
                    ['Capacity', capacity.data[8]]
                ]
            },
            {
                id: 'october',
                name: 'October Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[9]],
                    ['Quality', quality.data[9]],
                    ['Capacity', capacity.data[9]]
                ]
            },
            {
                id: 'november',
                name: 'November Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[10]],
                    ['Quality', quality.data[10]],
                    ['Capacity', capacity.data[10]]
                ]
            },
            {
                id: 'december',
                name: 'December Breakdown',
                data: [
                    ['On Time Delivery', onTimeDelivery.data[11]],
                    ['Quality', quality.data[11]],
                    ['Capacity', capacity.data[11]]
                ]
            }
        ];

    $('#hcColDD').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            style: {
                'display': 'none'
            }
        },
        subtitle : {
            text: '(Click Column For Monthly Breakdown)'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total Monthly Score (%)'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
        },

        series: [
            {
                name: 'Monthly Totals',
                colorByPoint: true,
                data: monthlyTotals
            }
        ],
        drilldown: {
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: 'white',
                    'stroke-width': 1,
                    stroke: 'silver',
                    r: 0,
                    states: {
                        hover: {
                            fill: '#ffa500'
                        },
                        select: {
                            stroke: '#ffa500',
                            fill: '#e59400'
                        }
                    }
                }
            },
            series: monthlyBreakDown
        },

        credits: {
            enabled: false
        }
    });


    // ------------------------
    // Product Quality

    $('#hcPie').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            style: {
                'display': 'none'
            }
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                slicedOffset: 40,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
                colors: [
                    "#90ee7e",
                    "#ffa500",
                    "#f45b5b"
                ]
            }
        },
        series: [{
            type: 'pie',
            data: [
                ['Exceptional', 45],
                ['Acceptable', 35],
                ['Below Standards', 20]
            ]
        }],
        credits: {
            enabled: false
        }
    });



    // ------------------------
    // Product Quality Drilldown

    $('#hcPieDD').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            style: {
                'display': 'none'
            }
        },
        subtitle: {
            text: '(Click Segment For Breakdown)'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                slicedOffset: 20,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [
            {
                name: 'Problem Areas',
                colorByPoint: true,
                data: [
                    {
                        name: 'Area A',
                        y: 28,
                        drilldown: 'A'
                    },
                    {
                        name: 'Area B',
                        y: 19,
                        drilldown: 'B'
                    },
                    {
                        name: 'Area C',
                        y: 24,
                        drilldown: 'C'
                    },
                    {
                        name: 'Area D',
                        y: 20,
                        drilldown: 'D'
                    },
                    {
                        name: 'Area E',
                        y: 6,
                        drilldown: 'E'
                    },
                    {
                        name: 'Area F',
                        y: 13,
                        drilldown: 'F'
                    }
                ]
            }
        ],
        drilldown: {
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: 'white',
                    'stroke-width': 1,
                    stroke: 'silver',
                    r: 0,
                    states: {
                        hover: {
                            fill: '#ffa500'
                        },
                        select: {
                            stroke: '#ffa500',
                            fill: '#e59400'
                        }
                    }
                }
            },
            series: [
                {
                    id: 'A',
                    name: 'Area A',
                    data: [
                        ['Workmanship', 30],
                        ['Out Of Spec', 13],
                        ['Low Quality', 57]
                    ]
                },
                {
                    id: 'B',
                    name: 'Area B',
                    data: [
                        ['Workmanship', 66],
                        ['Out Of Spec', 12],
                        ['Low Quality', 12]
                    ]
                },
                {
                    id: 'C',
                    name: 'Area C',
                    data: [
                        ['Workmanship', 30],
                        ['Out Of Spec', 13],
                        ['Low Quality', 57]
                    ]
                },
                {
                    id: 'D',
                    name: 'Area D',
                    data: [
                        ['Workmanship', 30],
                        ['Out Of Spec', 13],
                        ['Low Quality', 57]
                    ]
                },
                {
                    id: 'E',
                    name: 'Area E',
                    data: [
                        ['Workmanship', 30],
                        ['Out Of Spec', 13],
                        ['Low Quality', 57]
                    ]
                },
                {
                    id: 'F',
                    name: 'Area F',
                    data: [
                        ['Workmanship', 30],
                        ['Out Of Spec', 13],
                        ['Low Quality', 57]
                    ]
                }
            ]
        },
        credits: {
            enabled: false
        }
    });


});


