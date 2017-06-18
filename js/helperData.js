// Language resources 
// count, sex, living state, pclass, age_group, sibsp, parch, embark, fare
var string_box = {
	zh : {
		'header' : '泰坦尼克号：谁活了下来？',
		'footer' : 'Wolf 制作 \n 2017',
		'sur_0' : '死',
		'sur_1' : '生',
		'age' : '年龄',
		'sex': '性别',
		'count': '人数',
		'lv_state': '是否幸存',
		'female': '女',
		'male' : '男',
		'pclass': '船舱等级',
		'age_group': '年龄段',
		'sibsp' : '船上同辈亲属数量',
		'parch' : '船上不同辈亲属数量',
		'embark' : '上船地点',
		'fare' : '船上花费',
		'skip' : '跳过',
		'xchoice': '选择X轴',
		'intro1': '泰坦尼克号，悲剧之船：',
		'intro2': '船载2224人，1502人丧生。',
		'intro3': '通过891人的样本，我们回到过去，',
		'intro4': '看一看是谁活了下来。',
		
		'filterchoice': '筛选数据'
	},
	en : {
		'header' : 'Titanic - Who Survived?', 
		'footer' : 'Wolf, 2017',
		'sur_0' : 'Dead',
		'sur_1' : 'Survived',
		'age' : 'Age',
		'sex': 'Sex',
		'count': 'Count',
		'lv_state': 'Living State',
		'female' : 'Female',
		'male' : 'Male',
		'pclass': 'Passenger Class',
		'age_group': 'Age Group',
		'sibsp' : 'Number of of siblings / spouses',
		'parch' : 'Number of Parents / Children',
		'embark' : 'Port of Embarkation',
		'fare' : 'Fare Ranges',
		'skip' : 'Skip',
		'intro1': 'Titanic, the tragic big ship,',
		'intro2': 'Killed 1502 our of 2224 on board.',
		'intro3': 'With a sample of 891, we peek into the ship:',
		'intro4': 'And ask who survived.',
		'xchoice': 'Choose X Axis:',
		'filterchoice': 'Filter Data'
	}
};


var str_resource; // language of a particular string

var toPlotCategories = ['sex', 'age_group', 'fare', 'pclass','sibsp', 'parch', 'embark'];

var distinctValues = {}; // hold values for each category


function getDinstinctValues(param, data){
	
	var xset = new Set();
	return_arry = [];
	
	data.forEach(function(d){
		xset.add(d[param]);
	});
	xset.forEach(function(item){
		return_arry.push(item);
	})
	return return_arry.sort();
}

// Group age
var ageGroup = [10, 20, 30, 40, 50, 60],
	fareGroup = [50, 100, 200, 400, 500];

// Get window width and height
var width = window.innerWidth;
var height = window.innerHeight;
var svgWidth;
// Set svg width 
if(width < 520){
	svgWidth = width - 20;
}else{
	svgWidth = 500;
}

var language;

// Set default language function 
function popUpLanguageChoice(){
	d3.select('body')
		.append('div')
		.attr('class', 'big_overall')
		.selectAll('div')
		.data(['简体中文', 'English'])
		.enter()
		.append('div')
		.attr('class', 'language_choice')
		.text(function(d){
			return d;
		}).on('click', function(){
			txt = d3.select(this).text();
			if(txt == '简体中文'){
				localStorage.setItem('language', 'zh');
				language = 'zh';
				load_data();
			} else{
				localStorage.setItem('language', 'en');
				language = 'en';
				load_data();
			}
			str_resource = string_box[language];
			d3.select('.big_overall').remove();
		});
}


// Sample and overall data of living and dead
var overview_all = {'lv': 2224 - 1502 , 'de': 1502 };
var overview_this = {'lv': 342, 'de': 549};

// Initial introduction 
var intro = [{
			'type': 'text',
			'content': 'intro1',
			'x': 0.03 * svgWidth,
			'y' : 0.11 * svgWidth,
			'fs': 0.07 * svgWidth,
			'ff' : 'Arial'
		},
		{	
			'type': 'text',
			'content' : 'intro2',
			'x': 0.03 * svgWidth,
			'y' : 0.24 * svgWidth,
			'fs': 0.05 * svgWidth,
			'ff' : 'Arial'
		},
		{
			'type': 'graph',
			'data': overview_all,
			'x': 0.11 * svgWidth,
			'y': 0.28 * svgWidth
		}, {
			'type': 'text',
			'content': 'intro3',
			'x': 0.03 * svgWidth, 
			'y': 0.43 * svgWidth,
			'fs': 0.05 * svgWidth,
			'ff': 'Arial'
		}, {
			'type': 'graph',
			'data': overview_this,
			'x' : 0.11 * svgWidth,
			'y' : 0.47 * svgWidth
		}, {
			'type': 'text',
			'content': 'intro4',
			'x': 0.03 * svgWidth,
			'y': 0.65 * svgWidth,
			'fs': 0.05 * svgWidth,
			'ff': 'Arial' 
		}];