// This file get 

var svg = d3.select('#main').append('svg')
			.attr('width', svgWidth)
			.attr('height', 0.8 * svgWidth);

// Add buttons to change X axis
function appendButtons(language){
	d3.select('#aside').text('');

	d3.select('#aside').append('div').attr('class', 'side_div')
		.selectAll('div')
		.data(toPlotCategories)
		.enter()
		.append('div')
		.text(function(d){
			//debugger;
			return str_resource[d];
		}).on('click', function(d){
			draw(filter_this_data(), str_resource[d], str_resource['count']);
		})
		.attr('class', 'sub_divs');
}

var filter_requirements;
var attach_eventLisenter = false;

// Hide or show function 
function toggleDisplay(elem){
	if(elem.attr('class') == 'hidden'){
		elem.attr('class' , '') ;
	}else{
		elem.attr('class', 'hidden');
	}
}


// Skip button during animation 
function displayJumpButton(){
	svg.append('text')
		.text(str_resource['skip'])
		.attr('class', 'jump')
		.attr('x', svgWidth - 40)
		.attr('y', 0.8*svgWidth - 20)
		.style('fill', '#999')
		.on('click', function(){
			clearInterval(interval);
			clearTimeout(timeout);
			draw(data_2, str_resource['sex'], str_resource['count']);
			init(language);
			
			// 
		})
}

// After animation, show the necessary contents on the page using init
// incuding: header, langauge switcher, x Axis choice, and filter box
function init(language){
	strings = str_resource;
	d3.select('#header').text(strings.header);
	appendButtons(language); 
	d3.select('body').style('background', '#aaa');
	d3.select('#header').style('background', '#aaa');
	//d3.select('#footer').text(strings.footer);
	appendFilterFunction(language);
	filter_requirements = {};
	toPlotCategories.forEach(function(cat){
		filter_requirements[cat] = [];
	});

	d3.select('#xchoice').text(str_resource['xchoice']);
	d3.select('#filterchoice').text(str_resource['filterchoice']);


	if(!attach_eventLisenter){
		d3.select('#filterchoice').on('click',function(){
			toggleDisplay(d3.select('#filter'));
		});

		d3.select('#xchoice').on('click', function(){
			toggleDisplay(d3.select('#aside'));
		});
	}

	attach_eventLisenter = true;
	d3.select('#xchoice_container').style('border', '1px solid gray');
	d3.select('#filter_container').style('border', '1px solid gray');

	if(!svgWidth<= 400){
		d3.select('#language_button').style('display', 'block');
	}
}