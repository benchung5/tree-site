import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import FieldMultiSelect from '../parts/fieldMultiSelect';
import FieldAddImages from '../parts/fieldAddImages';
import FieldTextarea from '../parts/fieldTextarea';
import Sidebar from '../sidebar';
import { fetchPlantTables, addPlant } from '../../actions/plants';
import plantTablesStore from '../../storage/plantTablesStore';
import appStateStore from '../../storage/appStateStore';
import plantFields from './plantFields';
import { checkFieldErrors } from '../../lib/formUtils';
import UpdateMessage from '../parts/updateMessage';

//config
var { ADMIN_URL } = require('../../config')['globals'];

var PlantAdd = {
	submitForm: function(e) {
		// prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		// append new image data to formData
		this.fieldAddImages.state.croppedOut.map((item, index) => {
			formData.append('image'+'_'+index+'_original', item.originalFile);
			formData.append('image'+'_'+index+'_cropped', item.croppedFile);
			formData.append('image'+'_'+index+'_info', item.tag_id+'|||'+item.description+'|||'+item.caption);
		});


		//delete any empty fields in formData
		Array.from(formData).map((item) => {
			if (item[1] == '') {
				formData.delete(item[0]);
			}
		});

		// //use this to log out formdata values
		// console.log(Array.from(formData));

		//handle field errors
		let hasErrors = checkFieldErrors(e.target, plantFields);

		if(hasErrors) {
			this.updateMessage.renderError(`<span>please fill in all required fields</span>`);
		} else {
			//form no longer touched
			appStateStore.setData({ formTouched: false });

			// call action to submit edited
			addPlant(formData, this.renderUpdated.bind(this));

			this.updateMessage.clear();
		}
	},
	onInputChange: function() {
		this.updateMessage.clear();
	},
	renderUpdated: function(response) {
		this.updateMessage.clear();
		if(response.error) {
			this.updateMessage.renderError(`<span>Error: ${response.error}</span>`);
		} else {
			this.updateMessage.renderSuccess(`Tree: ${response.common_name}<br/>successfully added.`);
		}
	},
	onLoad: function() {
		//first clear the form fields
		this.formFields.innerHTML = '';
		this.updateMessage.clear();

		//get plant table data
		fetchPlantTables((plantTables) => {
			//use plantTablesStore because some values exist there statically and not in the plantTables
			plantTablesStore.setData(plantTables);

			//create the fields
			plantFields.map((item) => {
				if(item.type === 'input') {
					let input = FieldInput.init({
						name: item.name,
						label: item.label,
						error: item.error,
						condition: item.condition
					});
					this.formFields.appendChild(input.el);
				}
				if(item.type === 'dropdownSelect') {
					let dropdownSelect = FieldDropdownSelect.init({
						name: item.name,
						label: item.label,
						error: item.error,
						condition: item.condition,
						selectItems: plantTablesStore.storageData[item.name]
					});
					this.formFields.appendChild(dropdownSelect.el);
				}
				if(item.type === 'multiSelect') {
					let multiSelect = FieldMultiSelect.init({
						name: item.name,
						label: item.label,
						error: item.error,
						condition: item.condition,
						selectItems: plantTablesStore.storageData[item.name]
					});
					this.formFields.appendChild(multiSelect.el);
				}
				if(item.type === 'textarea') {
					let textarea = FieldTextarea.init({
						name: item.name,
						label: item.label,
						error: item.error,
						condition: item.condition,
					});
					this.formFields.appendChild(textarea.el);
				}
			});

			//init fieldAddImages
			this.fieldAddImages = FieldAddImages.init({
				tags: plantTablesStore.storageData['tags']
			});
			this.formFields.appendChild(this.fieldAddImages.el);
		});
	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({ el: 
		`<div class="admin-main">
              <div class="row">
                  <div class="main-window columns small-12 large-9">
                      <h3>Add Plant</h3>
                      <form>
	                      <div id="form-fields">
	                      </div>
	                      <button action="submit" class="btn btn-primary">Submit</button>
                      </form>
                  </div>
              </div>
          </div>
	      `
		});

		//build
		inst.sidebar = Sidebar.init({});
		inst.updateMessage = UpdateMessage.init({});
		const mainWindow = inst.el.querySelector('.main-window');
		mainWindow.before(inst.sidebar.el);
		inst.formFields = inst.el.querySelector('#form-fields');
		inst.form = inst.el.querySelector('form');
		inst.form.addEventListener('submit', inst.submitForm.bind(inst));
		inst.formFields.addEventListener('focus', () => { appStateStore.setData({ formTouched: true }) }, true);
		inst.form.after(inst.updateMessage.el);

		return inst;
	}
}

export default PlantAdd;