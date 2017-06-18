// Append data filter buttons to the page and enable data filtering. 

// First, use appendFilterFunction to add filter panel to #filter div. 

// Then add event listeners to each filter item, so that when a new requirement
// is added, the new requirement is pushed to filter_requirements

// And when another requirement is added, update data and plot. 

function appendFilterFunction(language){
	// First clear what inside #filter div
	d3.select('#filter').selectAll('*').remove();
	// Append the different catagory names to #filter div
	d3.select('#filter').selectAll('div')
		.data(toPlotCategories)
		.enter()
		.append('div')
		.attr('class', function(d){
			return 'filter_father cat-' + d;
		})
		.text(function(d){
			return str_resource[d];
		});
	// Append different items to each category.  
	toPlotCategories.forEach(function(cat){

		d3.select('.cat-' + cat)
			.append('div')
			.attr('class', 'filter_container')
			.selectAll('div')
			.data(distinctValues[str_resource[cat]])
			.enter()
			.append('div')
			.attr('class', 'filter_item')
			.on('click', function(e){
				// Add event listeners so that when a new requirement is added, 
				// update the graph
				d3.event.stopPropagation();
				elem = d3.select(this);
				the_cat = d3.select(this.parentNode.parentNode)
					.attr('class').split('-')[1];
				requirment_this = elem.text();
				if(filter_requirements[the_cat].indexOf(requirment_this) >= 0 ){
					filter_requirements[the_cat].splice(filter_requirements[the_cat].indexOf(requirment_this), 1);
					elem.style('background', '');
				}else{
					filter_requirements[the_cat].push(requirment_this);
					elem.style('background', 'lightyellow');
				}
				updatePlotWithFiltering();					
			})
			.text(function(d){
				return d;
			});
	})
	/* 
	d3.selectAll('.filter_father').on('click', function(){
		children = d3.select(this).selectAll('.filter_item');
		if (children.classed('hidden')){
			children.attr('class', 'filter_item');
		}else {
			children.attr('class', 'filter_item hidden');
		}
	})
	*/
}


function updatePlotWithFiltering(){
	// Update the graph when filtering
	filtered_data = filter_this_data();
	draw(filtered_data, global_x, global_y);
}

// data filtering function
function filter_this_data(){
	var return_arry = [];
	for(var i = 0; i < data_2.length; i++){
		var point_status = false;
		toPlotCategories.forEach(function(cat){
			cat_re = filter_requirements[cat];
			if(cat_re.length > 0 && cat_re.indexOf(data_2[i][str_resource[cat]]) < 0){
				point_status = true;
			}
		})

		if(!point_status){
			return_arry.push(data_2[i]);
		}
	}
	
	return return_arry;
}