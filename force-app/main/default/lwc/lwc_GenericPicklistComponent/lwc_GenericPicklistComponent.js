import { LightningElement, api, track, wire } from 'lwc';
import {getPicklistValues, getObjectInfo} from 'lightning/uiObjectInfoApi';

export default class Lwc_GenericPicklistComponent extends LightningElement {
    @api objAPIName;
    @api fieldAPIName;
    @track options = [];
    // pick list label
    @track picklistlabel;
    @track error;
    @api selectedValue;
    @api requiredVal;  
    @api customStatusLabel;
 
    recordTypeId;
    objfieldAPIName;

    @wire(getObjectInfo, {objectApiName: '$objAPIName'})
    objectInfo(result) {
        if(result.data) {
            // Field Data
            let fieldData = result.data.fields[this.fieldAPIName];
            if(fieldData) {
                if (this.customStatusLabel != null && this.customStatusLabel != '')
                {
                    this.picklistlabel = this.customStatusLabel;
                }
                else{
                    this.picklistlabel = fieldData.label;
                }
                this.objfieldAPIName = {};
                this.objfieldAPIName.fieldApiName = fieldData.apiName;
                this.objfieldAPIName.objectApiName = result.data.apiName;
                this.recordTypeId = result.data.defaultRecordTypeId;
            }
            else {
                this.error = 'Please enter valid field api name';
            }
        }
        else if(result.error) {
            this.error = JSON.stringify(result.error);
        }
    }

    constructor() {
        super();
    }

    connectedCallback(){
        //alert(' input val obj name' + this.objAPIName);
        //alert(' input val fieldname' + this.fieldAPIName);
        //alert(' input val selectdVal' + this.selectedValue);
        //alert(' input val required val' + this.requiredVal);
        this.objfieldAPIName = { fieldApiName: this.fieldApiName, objectApiName: this.objectApiName };
 
    }
    
    renderedCallback() {
        var spanblock = this.template.querySelector('[data-id="spanblock"]');
        if (spanblock)
        {
            if (this.requiredVal ==='true') {
                this.template.querySelector('[data-id="spanblock"]').className = 'requiredChk';
                this.template.querySelector('[data-id="brblock"]').className = 'notRequiredChk';
            }
            else {
                this.template.querySelector('[data-id="spanblock"]').className = 'notRequiredChk';
                this.template.querySelector('[data-id="brblock"]').className = 'requiredChk';
            }
        }
     }
    
    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: '$objfieldAPIName'})
    picklistValues({error, data}) {
        if (data) {

            let picklistOptions = [{ label: '--None--', value: '--None--'}];

            // Picklist values
            data.values.forEach(key => {
                picklistOptions.push({
                    label: key.label, 
                    value: key.value
                })
            });

            this.options = picklistOptions;

        } else if (error) {
            this.error = JSON.stringify(error);
        }
    }


    handleValueChange(event) {
        this.selectedValue = event.target.value;
    }

    @api
    validate()
    {
        if (this.requiredVal == 'true')
        {
            if (this.selectedValue == '--None--' || this.selectedValue == undefined) {
                //this.template.querySelector('[data-id="comboBlock"]').classList.add('divBlock');
                return {
                    isValid: false,
                    errorMessage: '<b style="margin-top:-15px !important;margin-left:2px;padding-bottom:5px !important;font-weight:normal;">Please select a valid picklist value. The field is required.</b>'                    
                };
            }
            else {
                //this.template.querySelector('[data-id="comboBlock"]').classList.remove('divBlock');
                return { isValid: true };
            }
        }
        else {
            //this.template.querySelector('[data-id="comboBlock"]').classList.remove('divBlock');
            this.incrementVal = 0;
            return { isValid: true };
        }
    }

}