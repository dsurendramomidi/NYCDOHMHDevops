import { LightningElement ,wire, api, track} from 'lwc';
import lookUp from '@salesforce/apex/KnowledgeSearchController.search';

export default class Lwc_SearchKnowledgeComponent extends LightningElement {
    @api objName;
    @api iconName = 'knowledge_base';
    @api filter = '';
    @api searchPlaceholder='Search by topic: from "Payroll" to "IT" issues';
    @track selectedName;
    @track records;
    @track isValueSelected;
    @track blurTimeout;
    @track searchTerm;
    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = ''; //, myObject : '$objName', filter : '$filter'
    
    @wire(lookUp, {searchTerm : '$searchTerm'})
    wiredRecords({ error, data }) {
        if (data) {
            console.log("got successfull response from Apex");
            console.log(data);
            console.log("data : " + data);
            this.error = undefined;
            this.records = data;
        } else if (error) {
            console.log("got error response from Apex");
            this.error = error;
            this.records = undefined;
            console.log('error response' + JSON.stringify(error));
        }
    }
    handleClick() {
        console.log("on handle click : ");
        console.log("handle clicke event : ");
        this.searchTerm = '';
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onBlur() {
        console.log("on blur : ");
        this.blurTimeout = setTimeout(() =>  {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }

    onSelect(event) {
        console.log("on select");
        let url;
        let path = window.location.pathname;
        if(path && path.includes("employees")){
            url = '/employees/s/article/' + event.currentTarget.dataset.id;
        } else {
            url = '/s/article/' + event.currentTarget.dataset.id; //evt.target.value;
        }
        window.location = url;

    }

    handleRemovePill() {
        console.log("on handle remove pill value : ");
        this.isValueSelected = false;
    }

    onChange(event) {
        console.log("on change event search strig value : " + event.target.value);
        this.searchTerm = event.target.value;
    }

    handleKeyUp(evt) {
        
        this.loaded = !this.loaded;
        
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            let path = window.location.pathname;
            console.log("path : " + path);
            
            let url;
            if(path && path.includes("employees")){
                url = '/employees/s/global-search/' + evt.target.value;
            } else {
                url = '/s/global-search/' + evt.target.value;
            }
            window.location = url;
        }
       
    }
}