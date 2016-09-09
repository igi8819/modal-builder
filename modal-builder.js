/**
 * Created by kovacs.oszkar on 2016.08.19..
 */
"use strict";
var ModalBuilder = function(id) {
	this.id = id || "";
	var form = document.getElementById(id),
	    formFields = {
			"modalTitle": document.getElementById("modal-title"),
			"modalBody": document.getElementById("modal-body"),
			"modalBttns": document.getElementById("modal-buttons")
	     },
             validator = new Validator(formFields);

	form.onsubmit = function(){
		var modalContainer = document.createElement('div'),
		    modalTitle = document.createElement('h2'),
		    modalBody = document.createElement('p'),
		    bttns = formFields.modalBttns.value.split(",");
		if (validator.isValid() !== true) {
			alert(validator.getErrorMessages());
			return false;
		}

		modalContainer.appendChild(modalTitle);
		modalContainer.appendChild(modalBody);
		for(var i in bttns) {
			let label = bttns[i].trim();
			if(label.length){
				var btn = document.createElement('button');
				btn.innerText = label;
				btn.type = "button";
				modalContainer.appendChild(btn);
			}
		}

		modalTitle.innerHTML = formFields.modalTitle.value;
		modalBody.innerHTML = formFields.modalBody.value;

		console.debug(modalContainer);

		modalContainer.id = "modal-container";


		return false;
	};
},
Validator = function(fields) {
	this.fields = fields || [];
};
Validator.prototype.errorMessages = [];		
Validator.prototype.isValid = function(){
	this.errorMessages = [];
	for (var i in this.fields) {	
		let field = this.fields[i],
		    label = field.previousElementSibling.innerText.replace(": ", "");		
		if (!field.value.length) {
			this.errorMessages.push("Please fill: " + label);
		}			
	}
	return this.errorMessages.length === 0;
};
Validator.prototype.getErrorMessages = function() {
	return this.errorMessages.join("\n")
};
