// Load and transform Data:


// Transform interval data as age and fare into categorical
// according to an array
function getBetween(num, numGroup){
	for(var i = 0; i < (numGroup.length - 1); i++){
		if (numGroup[i] <= num && numGroup[i+1] > num){
			return String(numGroup[i]) + '-' + String(numGroup[i+1]);
		}
	}
}

// Transform data that is beyond the array range
function groupNum(num, groupNumber){
	var group ='';

	if(num == ''){
		group =  'NA';
	}else if(parseFloat(num) < groupNumber[0]){
		group =  ' < '+ String(groupNumber[0]);
	}else if(parseFloat(num) >= groupNumber[groupNumber.length  - 1]){
		group =  ' >= ' + String(groupNumber[groupNumber.length-1]);
	}else{
		group = getBetween(num, groupNumber);
	}
	
	return group;
}

// Change letters to port names
function getPort(L){
	ports = {'C' : 'Cherbourg', 'Q' : 'Queenstown', 'S' : 'Southampton', '': 'NA'};
	return ports[L];
}

// Load and transform data
function load_data(){
	d3.csv('data/titanic_data.csv', function(d){
		// Transform the data for visualisation to label the axis correctly

		d['Count'] = 1;
		d['人数'] = 1;
		
		if(d['Survived']== '0'){
			d['Living State'] = 'Dead';
			d['是否幸存'] = '死';
		}else{
			d['Living State'] = 'Survived';
			d['是否幸存'] = '生';
		}

		d['性别'] = (d['Sex'] == 'male' ? '男' : '女');

		d['Passenger Class'] = d['Pclass'];
		d['船舱等级'] = d['Pclass'];
		
		d['Age Group'] = groupNum(d['Age'], ageGroup);
		d['年龄段'] = groupNum(d['Age'], ageGroup);
		
		d['船上同辈亲属数量'] = d['SibSp'];
		d['Number of of siblings / spouses'] = d['SibSp'];
		
		d['船上不同辈亲属数量'] = d['Parch'];
		d['Number of Parents / Children'] = d['Parch'];
		
		d['Port of Embarkation'] = getPort(d['Embarked']);
		d['上船地点'] = getPort(d['Embarked']);
		
		d['船上花费'] = groupNum(d['Fare'], fareGroup);
		d['Fare Ranges'] = groupNum(d['Fare'], fareGroup);
		
		return d;
	}, startAnimate);
}




// Adding language switchers 
document.getElementById('ZH').addEventListener('click' , function(){
	language = 'zh';
	init(language);
	str_resource = string_box[language];
	draw( filter_this_data(), str_resource['sex'], str_resource['count']);
	appendButtons(language);
	localStorage.setItem('language', 'zh');
});
document.getElementById('EN').addEventListener('click' , function(){
	language = 'en';
	init(language);
	draw(filter_this_data(), str_resource['sex'], str_resource['count']);
	appendButtons(language);
	localStorage.setItem('language', 'en');
});