// After data is loaded, do animation. 
var data_2 = [];
var interval;
var timeout;
function startAnimate(data){
	//Save the data to a variable 	
	data_2 = data;

	// Render the data background 

	for(var i = 0; i<intro.length; i++){
		if (intro[i].type == 'text'){
			renderText(intro[i]);
		}else{
			drawRectangle(intro[i]['data'], intro[i]['x'],intro[i]['y']);
		}
	}

	for(var i=0; i<toPlotCategories.length; i++){
		['en', 'zh'].forEach(function(l){
			if(toPlotCategories[i] == 'age_group'){
				the_arry = getGroupOrder(ageGroup);
				the_arry.pop();
				distinctValues[string_box[l][toPlotCategories[i]]] = the_arry;
			}else if(toPlotCategories[i] == 'fare'){
				the_arry = getGroupOrder(fareGroup);
				the_arry.pop();
				distinctValues[string_box[l][toPlotCategories[i]]] = the_arry;
			}else{
				distinctValues[string_box[l][toPlotCategories[i]]] = getDinstinctValues(string_box[l][toPlotCategories[i]], data);
			}
			
		});
	}

	displayJumpButton();
	// wait for 5 seconds, then start Animation
	timeout = setTimeout(animate, 5000);
}

var current_frame = 0;
// For each category, show as a frame
function updateFrame(){
	// Do animation
	var frame = toPlotCategories[current_frame];
	//debugger;
	clearSvgThen(function(){
		//debugger;
		renderGraph(str_resource[frame])

		current_frame += 1;
		if (current_frame == toPlotCategories.length){
			clearInterval(interval);
			// TODO: Render the other options and play again button
			init(language);
			d3.select('#header').style('background', '#aaa');
			// appendFilterFunction(language);
		} else{

			displayJumpButton();
		}
	});
}

function animate(){
	interval = setInterval(updateFrame, 3000);
}

// Helper functions

function drawRectangle(overviewData, x, y){
	var all = overviewData['lv'] + overviewData['de']
	var maxPx = all / 2224 * (svgWidth * 0.8);

	var this_scale = d3.scaleLinear().range([0, maxPx]).domain([0, all]);

	svg.append('rect')
		.attr('height', 0.07 * svgWidth)
		.attr('width', this_scale(overviewData['de']))
		.attr('x', x)
		.attr('y', y)
		.attr('fill', '#FB8072')
		.attr('opacity', 0)
		.transition()
		.duration(500)
		.attr('opacity', 1);

	svg.append('rect')
		.attr('height', 0.07 * svgWidth)
		.attr('width', this_scale(overviewData['lv']))
		.attr('x', x + this_scale(overviewData['de']))
		.attr('y', y)
		.attr('fill', ' #80B1D3')
		.attr('opacity', 0)
		.transition()
		.duration(500)
		.attr('opacity', 1);

	svg.append('text')
		.attr('x', x +5)
		.attr('y', y + 18)
		.text(str_resource['sur_0'])
		.attr('strock', 'black')
		.attr('opacity', 0)
		.transition()
		.duration(500)
		.attr('opacity', 1);

	svg.append('text')
		.attr('x', x+ this_scale(overviewData['de']) +5 )
		.attr('y', y + 18)
		.text(str_resource['sur_1'])
		.attr('strock', 'black')
		.attr('opacity', 0)
		.transition()
		.duration(500)
		.attr('opacity', 1);
}

function renderText(line){
	svg.append('text')
		.text(str_resource[line['content']])
		.attr('x', line['x'])
		.attr('y', line['y'])
		.attr('font-size', line['fs'])
		.attr('font-family', line['ff'])
		.attr('opacity', 0)
		.transition()
		.duration(500)
		.style('opacity', 1);
}

function renderGraph(content){
	draw(data_2, content, str_resource['count'])
}

function getGroupOrder(arry){
	return_arry = [' < ' + arry[0]];
	for(var i = 0; i<arry.length - 1; i++){
		return_arry.push(String(arry[i]) + '-' + String(arry[i+1]));
	}
	return_arry.push(' >= ' + arry[arry.length - 1]);
	return_arry.push('NA');
	return return_arry;
}


function clearSvgThen(callback){
	svg.selectAll('*').attr('opacity', 1).
		transition().duration(500).attr('opacity', '0')
		.remove()
		.call(function(){
			callback();
		});
}

// Draw a bar plot using the given data and x y axis names
function draw(data, x, y) {
	//debugger;
	//var svg = clearAndDrawSvg();
	global_x = x;
	global_y = y;
	
	clearSvgThen(function(){
		var c_lan = str_resource,
		 	count = c_lan['count'],
			lv_state = c_lan['lv_state'],
			sex = c_lan['sex'];
		
		//debugger;
		var chart = new dimple.chart(svg, data);
		var xAxis = chart.addCategoryAxis('x', x);
		xAxis.title = x;

		if (x == str_resource['age_group']){
			xAxis.addOrderRule(getGroupOrder(ageGroup));
		}else if(x==str_resource['fare']){
			xAxis.addOrderRule(getGroupOrder(fareGroup));
		}
		

		yAxis = chart.addMeasureAxis('y', y);
		//yAxis.title = y;

		var series = chart.addSeries(lv_state, dimple.plot.bar);
		

		chart.assignColor(c_lan['sur_0'], '#FB8072', 'grey', 0.7);
		chart.assignColor(c_lan['sur_1'], '#80B1D3', 'grey', 0.7);


		chart.setBounds(50, 30, 0.75*svgWidth, 0.60*svgWidth);
		
		legend = chart.addLegend(0.84*svgWidth, 0.3*svgWidth, 50,50);

		
		// Reverse the lengend color, copied from StackOverflow
		legend._getEntries_old = legend._getEntries;	
		legend._getEntries = function(){
			return legend._getEntries_old.apply(this, arguments).reverse();
		}

		chart.draw(500);
		yAxis.titleShape.attr('transform', "rotate(270," + 0.06 * svgWidth + "," +  0.38*svgWidth + " )");
		xAxis.titleShape.style('font-size', svgWidth * 0.048 + 'px').style('font', 'Arial').attr('y', svgWidth * 0.77);
	})
}



// Language setting.
if(!localStorage.getItem('language')) {
	popUpLanguageChoice();

} else {
  language = localStorage.getItem('language');
  str_resource = string_box[language];
  load_data();
}


