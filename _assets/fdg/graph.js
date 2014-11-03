var width = 600,
    height = 500;

var color = d3.scale.category10();

var radius = d3.scale.pow().range([15,30]).domain([2,4]);

var charge = d3.scale.pow().range([-100,-5000]).domain([2,4]);

var svg = d3.select("#svg").append("svg")
    .attr("width", width)
    .attr("height", height);

var dataPath = d3.select("#svg").attr("data-json-path");

d3.json(dataPath, function(error, graph) {

  var force = d3.layout.force()
      .size([width, height])
      .nodes(graph.nodes)
      .links(graph.links)
      .charge(function(d) { console.log(d);return charge(d.id.degree); } )
      .distance(40)
      .on("tick", tick)
      .start();

  var drag = force.drag()
      .on("dragstart", dragstart);

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke", "#444")
      .style("stroke-opacity", ".6")
      .style("stroke-width", "4");

  var nodeg = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .on("dblclick", dblclick)
      .call(drag);

  var node = nodeg.append("circle")
      .attr("r", function(d) { return radius(d.id.degree); } )
      .style("fill", function(d,i) { return color(i); })
      .style("stroke", "#222")
      .style("stroke-width", "1.5px")

  nodeg.append("text")
      .style("font", "16px sans-serif")
      .style("fill", "#000")
      .attr("dx", "-0.25em")
      .attr("dy", "0.35em")
      .text(function(d) { return d.id.i; });

  function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    // nodeg.attr("cx", function(d) { return d.x; })
        // .attr("cy", function(d) { return d.y; });
    nodeg.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }

  function dblclick(d) {
    d3.select(this).classed("fixed", d.fixed = false);
  }

  function dragstart(d) {
    d3.select(this).classed("fixed", d.fixed = true);
  }
});

