import Component from '../../component';

var FieldTextarea = {
	updateTextArea: function(newText, selectedText) {
	  //get the character index of the selected text

	  String.prototype.replaceAt=function(index, replacement) {
	    return this.substr(0, index) + replacement + this.substr(index + selectedText.length);
	  }

	  let fieldValue = this.textarea.value.slice();
	  let replacedBodyText = fieldValue.replaceAt(this.textarea.selectionStart, newText);

	  this.textarea.value = replacedBodyText;
	},
	wrapTextInElement: function(element, className) {
	  if (this.textarea.value) {
	     //get the current highlighted text
	     let selObj = window.getSelection(); 
	     let selectedText = selObj.toString();
	     let wrappedText = '';
	     if (className) {
	     	wrappedText = '<'+element+' class="'+className+'">'+selectedText+'</'+element+'>';
	     } else {
	     	wrappedText = '<'+element+'>'+selectedText+'</'+element+'>';
	     }

	     this.updateTextArea(wrappedText, selectedText);
	  }
	},
	onSecHeadingClick: function(e) {
	 e.stopPropagation();
	 e.preventDefault();

	 this.wrapTextInElement('h3');
	},
	onParagraphClick: function(e) {
	  e.stopPropagation();
	  e.preventDefault();

	  this.wrapTextInElement('p');
	},
	onSmallTextClick: function(e) {
	  e.stopPropagation();
	  e.preventDefault();

	  if (this.textarea.value) {
	     //get the current highlighted text
	     let selObj = window.getSelection(); 
	     let selectedText = selObj.toString();
	     //wrap it all in a div with class small
	     let wrappedText = '<div class="small-text">\n'+selectedText+'\n</div>';

	     this.updateTextArea(wrappedText, selectedText);
	  }
	},
	onMediaCenterClick: function(e) {
	  e.stopPropagation();
	  e.preventDefault();

	  this.wrapTextInElement('div', 'media-center');
	},
	onAnchorClick: function(e) {
	  e.stopPropagation();
	  e.preventDefault();

	  if (this.textarea.value) {
	     //get the current highlighted text
	     let selObj = window.getSelection(); 
	     let selectedText = selObj.toString();
	     //wrap it all in a div with class small
	     let wrappedText = '<a href="">'+selectedText+'</a>';

	     this.updateTextArea(wrappedText, selectedText);
	  }
	},
	onUlClick: function(e) {
	  e.stopPropagation();
	  e.preventDefault();

	  if (this.textarea.value) {
	     //get the current highlighted text
	     let selObj = window.getSelection(); 
	     let selectedText = selObj.toString();

	     //insert <li> elements at beginning of lines
	     let wrappedText = ' <li>' + selectedText.replace(/(?:\n|\r)/g, '\n <li>');
	     //insert </li> elements at line breaks
	     wrappedText = wrappedText.replace(/(?:\n|\r)/g, '</li>\n') + '</li>\n';
	     //remove the last \n
	     wrappedText = wrappedText.replace(/(?:\n)$/g, '');
	     //wrap it all in a ul
	     wrappedText = '<ul>\n'+wrappedText+'\n</ul>';

	     this.updateTextArea(wrappedText, selectedText);
	  }
	},
	onFigureClick: function(e) {
	  e.stopPropagation();
	  e.preventDefault();

	  //get the current highlighted text
	  let selObj = window.getSelection(); 
	  let selectedText = selObj.toString();

	  if (this.textarea.value) {
	     let wrappedText = '<figure>\n'+selectedText+'\n<figcaption></figcaption>\n</figure>';
	     this.updateTextArea(wrappedText, selectedText);
	  }
	},
	onClearClick: function(e) {
	  e.stopPropagation();
	  e.preventDefault();

	  //get the current highlighted text
	  let selObj = window.getSelection(); 
	  let selectedText = selObj.toString();

	  if (this.textarea.value) {
	     let wrappedText = '<div class="clear"></div>';
	     this.updateTextArea(wrappedText, selectedText);
	  }
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first 
		inst.initialize({
			el: 
			`<div class="form-group" data-name="${options.name}">
		       <label>${options.label}:</label>
		       <button id="h">h3</button>
		       <button id="p">p</button>
		       <button id="a">a</button>
		       <button id="ul">ul</button>
		       <button id="figure">figure</button>
		       <button id="clear">clear</button>
		       <button id="small-text">small text</button>
		       <button id="media-center">media center</button>

		       <textarea
			       class="form-control"
			       rows="12" 
			       cols="50"
			       name="${options.name}"
			   >${options.value || ''}</textarea>
		     </div>`
		});

		//handle errors, just for on blur, not on form submit
		let errorEl = inst.el.querySelector('.error');
		inst.el.querySelector('textarea').addEventListener('blur', (e) => {
			inst.input = inst.el.querySelector('textarea');
			if((options.condition === 'required') && (inst.input.value == '')) {
				errorEl.innerHTML = options.error;
			}
			
		}, false);

		//get parts
		inst.textarea = inst.el.querySelector('textarea');

		//add events
		inst.el.querySelector('#h').addEventListener('click', inst.onSecHeadingClick.bind(inst));
		inst.el.querySelector('#p').addEventListener('click', inst.onParagraphClick.bind(inst));
		inst.el.querySelector('#ul').addEventListener('click', inst.onUlClick.bind(inst));
		inst.el.querySelector('#figure').addEventListener('click', inst.onFigureClick.bind(inst));
		inst.el.querySelector('#clear').addEventListener('click', inst.onClearClick.bind(inst));
		inst.el.querySelector('#small-text').addEventListener('click', inst.onSmallTextClick.bind(inst));
		inst.el.querySelector('#media-center').addEventListener('click', inst.onMediaCenterClick.bind(inst));
		inst.el.querySelector('#a').addEventListener('click', inst.onAnchorClick.bind(inst));
		

		return inst;
	}
}

export default FieldTextarea;