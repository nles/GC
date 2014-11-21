var ArborRenderer = function(elt){
  var dom = $(elt)
  var canvas = dom.get(0)
  var ctx = canvas.getContext("2d");
  var gfx = arbor.Graphics(canvas)
  var sys = null

  var _vignette = null
  var selected = null,
  nearest = null,
  _mouseP = null;

  var rendee = {
    init:function(pSystem){
      sys = pSystem
      sys.screen({size:{width:dom.width(), height:dom.height()},padding:[36,60,36,60]})
      $(window).resize(rendee.resize)
      rendee.resize()
      rendee._initMouseHandling()
    },
    resize:function(){
      canvas.width = $(window).width()
      canvas.height = .95* $(window).height()
      sys.screen({size:{width:canvas.width, height:canvas.height}})
      _vignette = null
      rendee.redraw()
    },
    redraw:function(){
      gfx.clear()
      sys.eachEdge(function(edge, p1, p2){
        if (edge.source.data.alpha * edge.target.data.alpha == 0) return
          gfx.line(p1, p2, {stroke:"#b2b19d", width:2, alpha:edge.target.data.alpha})
      })
      sys.eachNode(function(node, pt){
        var w = Math.max(20, 20+gfx.textWidth(node.name) )
        if (node.data.alpha === 0) return
          if (node.data.shape == 'dot'){
            gfx.oval(pt.x-w/2, pt.y-w/2, w, w, {fill:node.data.color, alpha:node.data.alpha})
            gfx.text(node.name, pt.x, pt.y+7, {color:"white", align:"center", font:"Arial", size:12})
            gfx.text(node.name, pt.x, pt.y+7, {color:"white", align:"center", font:"Arial", size:12})
          } else {
            gfx.rect(pt.x-w/2, pt.y-8, w, 20, 4, {fill:node.data.color, alpha:node.data.alpha})
            gfx.text(node.name, pt.x, pt.y+9, {color:"white", align:"center", font:"Arial", size:12})
            gfx.text(node.name, pt.x, pt.y+9, {color:"white", align:"center", font:"Arial", size:12})
          }
      })
      rendee._drawVignette()
    },

    _drawVignette:function(){
      var w = canvas.width
      var h = canvas.height
      var r = 20
      if (!_vignette){
        var top = ctx.createLinearGradient(0,0,0,r)
        top.addColorStop(0, "#e0e0e0")
        top.addColorStop(.7, "rgba(255,255,255,0)")
        var bot = ctx.createLinearGradient(0,h-r,0,h)
        bot.addColorStop(0, "rgba(255,255,255,0)")
        bot.addColorStop(1, "white")
        _vignette = {top:top, bot:bot}
      }
      // top
      ctx.fillStyle = _vignette.top
      ctx.fillRect(0,0, w,r)
      // bot
      ctx.fillStyle = _vignette.bot
      ctx.fillRect(0,h-r, w,r)
    },

    calculateNextChildLocation: function(selectedNode){
      var children = []
      var edges = sys.getEdgesFrom(selectedNode)
      if(edges.length > 0){
        var children = $.map(sys.getEdgesFrom(selectedNode), function(edge){
          return edge.target
        })
      }
      if(children.length > 0){
        var xMod = 0
        var yMod = 0
        switch(children.length){
          // case 1: xMod = -.2; yMod = 0.1; break;
          // case 2: xMod = -.15; yMod = 0.1; break;
          // case 3: xMod = -.15; yMod = 0.1; break;
          // case 4: xMod = -.05; yMod = 0.1; break;
          // case 5: xMod = -.05; yMod = 0.1; break;
          // case 3: xMod = -.1; yMod = 1; break;
        }
        yMod = .5
        xMod = -.2
        var lastChild = children[children.length-1]
        return {x: lastChild.p.x + xMod, y: lastChild.p.y + yMod}
      }
      return {x: selectedNode.p.x, y: selectedNode.p.y - 1.3}
    },
    _initMouseHandling: function(){
      selected = null;
      nearest = null;
      var secondClick = false;
      var dragged = null;
      var oldmass = 1
      var _section = null
      var handler = {
        moved: function(e){
          return false
        },
        clicked: function(e){
          var pos = $(canvas).offset();
          _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
          nearest = dragged = sys.nearest(_mouseP);
          selected = (nearest.distance < 50) ? nearest : null
          if(secondClick){
            if (nearest && selected && nearest.node === selected.node){
              var newLocation = rendee.calculateNextChildLocation(nearest.node);
              newNode = struct.addNode("topic "+Math.floor(Math.random()*100),{color:"#000000", alpha:1, x: newLocation.x, y: newLocation.y})
              edge = struct.addEdge(nearest.node, newNode, {length:.03, pointSize:3})
              // return false
            }
          } else {
            secondClick = true;
            setTimeout(function(){ secondClick = false; },500)
          }
          if (dragged && dragged.node !== null) dragged.node.fixed = true
          $(canvas).unbind('mousemove', handler.moved);
          $(canvas).bind('mousemove', handler.dragged)
          $(window).bind('mouseup', handler.dropped)
          return false
        },
        dragged:function(e){
          var old_nearest = nearest && nearest.node._id
          var pos = $(canvas).offset();
          var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
          if (!nearest) return
          if (dragged !== null && dragged.node !== null){
            var p = sys.fromScreen(s)
            dragged.node.p = p
          }
          return false
        },
        dropped:function(e){
          if (dragged===null || dragged.node===undefined) return
          if (dragged.node !== null) dragged.node.fixed = false
          dragged.node.tempMass = 1000
          dragged = null;
          $(canvas).unbind('mousemove', handler.dragged)
          $(window).unbind('mouseup', handler.dropped)
          $(canvas).bind('mousemove', handler.moved);
          _mouseP = null
          return false
        }
      }
      $(canvas).mousedown(handler.clicked);
      $(canvas).mousemove(handler.moved);
    }
  }
  return rendee
}
