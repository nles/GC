var saveStructure = function(){
  var nodes = []
  var edges = []
  struct.eachNode(function(n){
    var shape = (n.data.shape) ? n.data.shape : null;
    nodes.push({id:n._id,name:n.name,shape:shape,x:n.p.x,y:n.p.y});
  })
  struct.eachEdge(function(e){
    edges.push({sid:e.source._id,tid:e.target._id});
  })
  nodes = JSON.stringify(nodes)
  edges = JSON.stringify(edges)
  $.post('/structures/create',{nodes:nodes, edges:edges});
};

var restoreStructure = function(){
  struct.eachNode(function(n){
    struct.pruneNode(n)
  });
  var id = prompt("ID");
  $.get('/structures/546f26f6153811c0af9a1c8a',function(response){
    testdata_nodes = response.nodes
    testdata_nodes = JSON.parse(testdata_nodes);
    testdata_edges = response.edges
    testdata_edges = JSON.parse(testdata_edges);
    nodes = {}
    $.each(testdata_nodes,function(){
      var node = this;
      nodes[node.id] = struct.addNode(node.name, {color:"#CD8500", alpha:1, shape: node.shape, x: node.x, y: node.y});
    });
    $.each(testdata_edges,function(){
      var edge = this;
      struct.addEdge(nodes[edge.sid], nodes[edge.tid], {length:10.75, pointSize:3})
    });
  })
};

// globals and initial execution
var struct = arbor.ParticleSystem();
$(document).ready(function(){
  struct.renderer = ArborRenderer("#visual-structure");
  struct.parameters({stiffness:0, repulsion:0, gravity:false, dt:0.225});
  node1 = struct.addNode("Click Me",{color:"#CD8500", shape:"dot", alpha:1});

  // testdata_nodes = '[{"id":1,"x":-0.5682397602963016,"y":-5.4479870505704024},{"id":2,"x":0.27714287815615535,"y":-1.1460117126815021},{"id":3,"x":0.27714287815615535,"y":-2.446011712681502},{"id":4,"x":0.27714287815615535,"y":-3.7460117126815025},{"id":5,"x":0.27714287815615535,"y":-5.046011712681502},{"id":6,"x":0.27714287815615535,"y":-6.346011712681502},{"id":7,"x":0.27714287815615535,"y":-7.646011712681502},{"id":8,"x":0.27714287815615535,"y":-8.946011712681502},{"id":9,"x":0.848623674508119,"y":-6.924253549423751},{"id":10,"x":0.8484574948825614,"y":-6.54180595147691},{"id":11,"x":0.8484574948825614,"y":-6.1593186931033035},{"id":12,"x":-0.575958547242372,"y":-6.65408727591282}]'
  // testdata_nodes = JSON.parse(testdata_nodes);
  // testdata_edges = '[{"sid":1,"tid":2},{"sid":2,"tid":3},{"sid":3,"tid":4},{"sid":4,"tid":5},{"sid":5,"tid":6},{"sid":6,"tid":7},{"sid":7,"tid":8},{"sid":6,"tid":9},{"sid":6,"tid":10},{"sid":6,"tid":11},{"sid":1,"tid":12}]'
  // testdata_edges = JSON.parse(testdata_edges);
  // nodes = {}
  // $.each(testdata_nodes,function(){
    // var node = this;
    // nodes[node.id] = struct.addNode("topic "+Math.floor(Math.random()*10000000),{color:"#CD8500", alpha:1, x: node.x, y: node.y});
  // });
  // $.each(testdata_edges,function(){
    // var edge = this;
    // struct.addEdge(nodes[edge.sid], nodes[edge.tid], {length:10.75, pointSize:3})
  // });
})
