import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';



ReactDOM.render(<App/>,document.getElementById('app'));


const input = document.querySelectorAll('input');
for(const i=0; i<input.length; i++){
	input[i].setAttribute('size',input[i].getAttribute('placeholder').length);
}

const textarea = document.querySelectorAll('textarea');
textarea.onkeyup = function(e){
	e = e || event;
	if (e.keyCode === 13 && !e.ctrlKey) {
		// start your submit function
	}
	return true;
}