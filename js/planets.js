$(document).ready(function() {
  createGraph('#data-table', '.chart');
  function createGraph(data, container){

    var bars = [];
    var figureContainer = $('<div id="figure"></div>');
    var graphContainer = $('<div class="graph"></div>');
    var barContainer = $('<div class="bars"></div>');
    var data = $(data);
    var container = $(container);
    var chartData;
    var chartYMax;
    var columnGroup;
    var barTimer;
    var graphTimer;
    
    var tableData = {
      chartData: function() {
        var chartData = [];
        data.find('tbody td').each(function() {
          chartData.push($(this).text());
        });
        return chartData;
      },
      chartHeading: function() {
        var chartHeading = data.find('caption').text();
        return chartHeading;
      },
      chartLegend: function() {
        var chartLegend = [];
        data.find('tbody th').each(function() {
          chartLegend.push($(this).text());
        });
        return chartLegend;
      },
      chartYMax: function() {
        var chartData = this.chartData();
        var chartYMax = Math.ceil(Math.max.apply(Math, chartData) / 1000) * 1000;
        return chartYMax;
      },
      yLegend: function() {
        var chartYMax = this.chartYMax();
        var yLegend = [];
        var yAxisMarkings = 5;            
        for (var i = 0; i < yAxisMarkings; i++) {
          yLegend.unshift(((chartYMax * i) / (yAxisMarkings - 1)) / 1000);
        }
        return yLegend;
      },
      xLegend: function() {
        var xLegend = [];
        data.find('thead th').each(function() {
          xLegend.push($(this).text());
        });
        return xLegend;
      },
      columnGroup: function() {
        columnGroup = [];
        var columns = data.find('tbody tr:eq(0) td').length;
        for (var i = 0; i < columns; i++) {
          columnGroup[i] = [];
          data.find('tbody tr').each(function() {
            columnGroup[i].push($(this).find('td').eq(i).text());
          });
        }
        return columnGroup;
      }
    };

    chartData = tableData.chartData();    
    chartYMax = tableData.chartYMax();
    columnGroup = tableData.columnGroup();

    $.each(columnGroup, function(i) {
      var barGroup = $('<div class="bar-group"></div>');
      for (var c = 0, d = columnGroup[i].length; c < d; c++){
        var barObject = {};
        barObject.label = this[c];
        barObject.height = (barObject.label / chartYMax) * 1000 + '%';
        barObject.bar = $('<div class="bar fig' + c +'"><span>' + barObject.label + '</span></div>').appendTo(barGroup);
        bars.push(barObject);
      }
      barGroup.appendTo(barContainer);
    });

    var chartHeading = tableData.chartHeading();
    var heading = $('<h4>' + chartHeading + '</h4>');
    heading.appendTo(figureContainer);

    var chartLegend = tableData.chartLegend();
    var legendList  = $('<ul class="legend"></ul>');
    $.each(chartLegend, function(i) {     
      var listItem = $('<li><span class="icon fig' + i + '"></div></span>' + this + '</li>')
        .appendTo(legendList);
      
    });
    legendList.appendTo(figureContainer);

    var xLegend = tableData.xLegend();
    var xAxisList = $('<ul class="x-axis"></ul>');
    $.each(xLegend, function(i) {
      var listItem = $('<li><span>' + this + '</span></li>').appendTo(xAxisList);
    });

    xAxisList.appendTo(graphContainer);

    var yLegend = tableData.yLegend();
    var yAxisList = $('<ul class="y-axis"></ul>');
    $.each(yLegend, function(i) {
      var listItem = $('<li><span>' + this + '</span></li>').appendTo(yAxisList);
    });
    yAxisList.appendTo(graphContainer);

    barContainer.appendTo(graphContainer);    
    graphContainer.appendTo(figureContainer);
    figureContainer.appendTo(container);

    function  displayGraph(bars, i) {
      if (i < bars.length) {
        $(bars[i].bar).animate({height: bars[i].height}, 500);
        barTimer = setTimeout(function(){i++; displayGraph(bars, i);
        }, 200);
      }
    }
    
    function resetGraph() {
      $.each(bars, function(i) {
        $(bars[i].bar).stop().css({'height': 0, '-webkit-transition': 'none'});
      });
      
      clearTimeout(barTimer);
      clearTimeout(graphTimer);
      
      graphTimer = setTimeout(function() {    
        displayGraph(bars, 0);
      }, 200);
    }
    $('#reset-graph-button').click(function() {
      resetGraph();
      return false;
    });
    resetGraph();
  }
});