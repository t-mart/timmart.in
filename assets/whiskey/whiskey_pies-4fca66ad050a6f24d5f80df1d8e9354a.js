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

  var pie_side = 200;
  var pie_radius = pie_side / 2;

  var pie_radius_scale = d3.scale.linear()
    .domain([0, 4])
    .range([pie_radius*0.4,pie_radius]);

  var arc_color = d3.scale.linear()
    .domain([0, 4])
    .range(["rgb(255,255,255)","rgb(218,165,32)"]);

  var flavor_color = d3.scale.linear()
    .domain([0, 4])
    .range(["white","black"]);

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

    pie_arc_g.append("text")
    .attr("class", "flavor_name")
    .attr("transform", function(d) { return "translate(" + pie_arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .attr("class","arc_label")
    .style("fill", function(d) { return flavor_color(d.data.value); } )
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.key; });

    pie_svgs.append("text")
    .attr("class","distillery")
    .style("text-anchor", "middle")
    .attr("dy", "0.5em")
    .text(function(d) {return d.Distillery;});
});
