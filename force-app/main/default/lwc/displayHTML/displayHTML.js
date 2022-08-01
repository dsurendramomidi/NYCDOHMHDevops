import { LightningElement, api } from 'lwc';

export default class DisplayHTML extends LightningElement {
  @api htmlContent;
  
  renderedCallback() {
    this.template.querySelector('div').innerHTML = this.htmlContent;
  }
}