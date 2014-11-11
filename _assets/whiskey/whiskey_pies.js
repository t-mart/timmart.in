var dataPath = d3.select("#svg").attr("data-json-path");
d3.csv(dataPath)
.row(function(d) {
  delete d.RowID;
  delete d.Postcode;
  delete d.Latitude;
  delete d.Longitude;
  var m = d3.map(d);
  m.forEach(function(k, v) {
    if (k === "Distillery") {
      this[k] = v;
    } else {
      this[k] = +v;
    }
  })
  return m;
})
.get(function(error, whiskies) {

  var pie_side = 190;
  var pie_radius = pie_side / 2;

  var pie_radius_scale = d3.scale.linear()
    .domain([0, 4])
    .range([pie_radius*0.4,pie_radius]);

  var arc_color = d3.scale.linear()
    .domain([0, 4])
    .range(["rgb(255,255,255)","rgb(218,165,32)"]);

  var flavor_opacity = d3.scale.linear()
    .domain([0, 4])
    .range([0.0, 1.0]);

  var pie_arc = d3.svg.arc()
    .outerRadius(function(d,i) {
      return pie_radius_scale(d.data.value); })
    .innerRadius(pie_radius * 0.4);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d,i) {
      return 1;
    });

  var pie_svgs = d3.select("#svg")
      .selectAll("pies")
      .data(whiskies)
    .enter()
      .append("svg")
      .attr("width", pie_side)
      .attr("height", pie_side)
      .append("g")
      .attr("transform", "translate(" + pie_radius + "," + pie_radius + ")");

  var pie_arc_g = pie_svgs.selectAll(".arc")
      .data(function(d,i) {
        return pie(d.entries().slice(1));
      })
    .enter()
      .append("g")
      .attr("class", "pie_arc");

    pie_arc_g.append("path")
      .attr("d", pie_arc)
      .style("fill", function(d) { return arc_color(d.data.value); });

    function onlyIfPresent(d) {
      if (d.data.value > 0) {
        return d.data.key;
      }
      return "";
    }

    var flavorLabels = pie_arc_g.append("text")
    .attr("class", "label flavor")
    .attr("transform", function(d) { return "translate(" + pie_arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .style("fill-opacity", function(d) { return flavor_opacity(d.data.value); } )
    .text(function(d) { return onlyIfPresent(d).slice(0,3); });

    pie_arc_g.on("mouseover", function() {
      d3.select(this).select(".label.flavor").text(function(d) { return onlyIfPresent(d); });
    });

    pie_arc_g.on("mouseout", function() {
      d3.select(this).select(".label.flavor").text(function(d) { return onlyIfPresent(d).slice(0,3); });
    });

    pie_svgs.append("text")
    .attr("class","label distillery")
    .attr("dy", "0.5em")
    .text(function(d) {return d.Distillery;});
});
