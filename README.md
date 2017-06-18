# Welcome to titanic data

Check it out here: http://wolfever.com/uda/data_vis3
Have fun explore! 

## Mechanism

1. Langauge setting: After the page is loaded, langauge setting is initialized. If langauge setting is stored in localStorage, then begin load data and anamition. Otherwise, set language first and save to the localStorage. (app.js line 211)

2. Data Load: Using d3 library json function, load and transform data. 

3. Data transformation: save the property names as Chinese and English full names, for example SibSp to 'Number of Siblings and spouses'. Save the values to respective Chinese as well, like translating 'male' and 'female'. (data_load_and_transform.js)

4. Animation: When doing animation, a background introduction was given. Then animate through sex, age, fare, passenger class, Number of siblings and spouses, number of parents and children, port of embarkation. (app.js)

5. Skip function: During animation, a skip button is appended to bottom right corner. When clicked, jump to the final page, and show other functionality to enable user exploration. (displayJumpButton in default_display.js)

6. Language switcher: On the top right corner is where readers can choose to render the page in  English or Chineses. 

7. X axis switcher: Appended to the bottom of the page. 

8. Data filtering: Reader can choose which group they want to check. And they can combine different features. (data_filtering.js)
Visualization for Titanic Data Set from Kagglle
