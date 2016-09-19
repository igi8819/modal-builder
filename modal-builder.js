/**
 * created by Igor
 */
"use strict";
var ModalBuilder = function(id) {

	/** define form and form elements */
	var form = document.getElementById(id);
	var formFields = {
		'title': document.getElementById('modal-title'),
		'body': document.getElementById('modal-body'),
		'buttons': document.getElementById('modal-buttons')
	};

	/** initialize validator object */
	var validator = new Validator(formFields);

	/** form submit action */
	form.onsubmit = function() {

		if (validator.isValid() !== true) {
			alert(validator.getErrorMessages());
			return false;
		}

		/** initialize and render modal html */
		var renderer = new Renderer(formFields);
		renderer.toHtml();

		return false;

	};

};

/** validator object */
var Validator = function(fields) {
	this.fields = fields || [];
};


Validator.prototype.errorMessages = [];

/** validator validate function */
Validator.prototype.isValid = function() {

	this.errorMessages = [];
	for (var i in this.fields) {
		var field = this.fields[i];
		var label = field.previousElementSibling.innerText.replace(": ", "");
		if (!field.value.length) {
			this.errorMessages.push("Please fill: " + label);
		}
	}
	return this.errorMessages.length === 0;

};

Validator.prototype.getErrorMessages = function() {
	return this.errorMessages.join("\n")
};

/** define renderer object */
var Renderer = function(formFields) {
	this.formElements = formFields || [];
};

/** renderer html function */
Renderer.prototype.toHtml = function() {

	/** get body html*/
	var body = document.getElementsByTagName('body')[0];

	/** create html elements */
	var modalContainer = document.createElement('div');
	var modalContent = document.createElement('div');
	var modalHeader = document.createElement('div');
	var modalTitle = document.createElement('h2');
	var modalBody = document.createElement('div');
	var modalFooter = document.createElement('div');
	var modalClose = document.createElement('span');

	/** get buttons from input */
	var bttns = this.formElements.buttons.value.split(",");

	/** added id/class to html elements */
	modalContainer.id = 'modal';
	modalContainer.className = 'modal';
	modalContent.className = 'modal-content';
	modalBody.className = 'modal-body';
	modalHeader.className = 'modal-header';
	modalFooter.className = 'modal-footer';
	modalClose.className = 'close';

	/**added inner text to close html element */
	modalClose.innerText = 'x';

	/** append close button and title to header html element */
	modalHeader.appendChild(modalClose);
	modalHeader.appendChild(modalTitle);

	/** append header and body to content */
	modalContent.appendChild(modalHeader);
	modalContent.appendChild(modalBody);

	for(var i in bttns) {

		var label = bttns[i].trim();

		if(label.length) {

			/** create button html elemet(s) */
			var btn = document.createElement('button');
			btn.innerText = label.replace(/<(?:.|\n)*?>/gm, "");
			btn.type = "button";

			/** append button to footer element */
			modalFooter.appendChild(btn);
		}
	}

	/** added form values to html elements */
	modalTitle.innerHTML = this.formElements.title.value.replace(/<(?:.|\n)*?>/gm, "");
	modalBody.innerHTML = this.formElements.body.value.replace(/<(?:.|\n)*?>/gm, "");

	/** append footer html element to content */
	modalContent.appendChild(modalFooter);

	/** append content to modal container */
	modalContainer.appendChild(modalContent);
	body.appendChild(modalContainer);

	/** out of modal click function */
	window.onclick = function(event) {
		if (event.target == modalContainer) {
			modalContainer.style.display = "none";
			body.removeChild(modalContainer);
		}
	};

	/** escape close function */
	window.onkeydown = function(event) {
		if (event.keyCode == 27) {
			modalContainer.style.display = "none";
			body.removeChild(modalContainer);
		}
	};

	/** close button click function */
	modalClose.onclick = function () {
		modalContainer.style.display = "none";
		body.removeChild(modalContainer);
	};


};
