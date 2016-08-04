function spec(data){
	return {
	  "width": 500,
	  "height": 200,
	  "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},
	  "data": [
	    {
	      "name": "table",
	      "values": data
	    }
	  ],
	  "scales": [
	    {
	      "name": "x",
	      "type": "linear",
	      "range": "width",
	      "zero": false,
	      "domain": {"data": "table", "field": "x"}
	    },
	    {
	      "name": "y",
	      "type": "linear",
	      "range": "height",
	      "nice": true,
	      "domain": {"data": "table", "field": "y"}
	    },
	    {
	      "name": "color", 
	      "type": "ordinal", 
	      "domain": {"data": "table", "field": "type"},
	      "range": "category10"
	    }
	  ],
	  "axes": [
	    {"type": "x", "scale": "x", "ticks": 20},
	    {"type": "y", "scale": "y"}
	  ],
	  "marks": [
	    {
	      "type": "group",
	      "from": {
	        "data": "table",
	        "transform": [{"type": "facet", "groupby": ["type"]}]
	      },
	      marks: [{
		      "type": "line",
		      //"from": {"data": "table"},
		      "properties": {
		        "enter": {
		          "interpolate": {"value": "monotone"},
		          "x": {"scale": "x", "field": "x"},
		          "y": {"scale": "y", "field": "y"},
		          "y2": {"scale": "y", "value": 0}
		        },
		        "update": {
		          //"fillOpacity": {"value": 1},
		          "stroke": {"scale": "color", "field": "type"}
		        },
		        "hover": {
		          //"fillOpacity": {"value": 0.5}
		        }
		      }
		    }]
		}
	  ]
	}
}

function refresh(data) {

	var width = 700,
	    thumb  = width / 5,
	    height = thumb/1.5; 


	var view;
	vg.parse.spec(spec(data), {
	  load: {}
	}, function(chart) {
	  view = chart({ el: "#examples", renderer: "svg" })
	    .update({});
	});

}

$.get('data.txt', {}, function(data) {
	var data2 = data.split('\n').reduce(function(previousValue, currentValue, index) {
		var arr = currentValue.split(',');
		return previousValue.concat([{type:"1min",x:index,y:arr[0]},{type:"5min",x:index,y:arr[1]},{type:"15min",x:index,y:arr[2]}]);
	}, []);
	refresh(data2);
});