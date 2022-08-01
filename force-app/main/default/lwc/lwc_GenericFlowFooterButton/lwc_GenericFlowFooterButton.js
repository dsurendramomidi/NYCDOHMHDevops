import { LightningElement, api } from 'lwc';
import { FlowNavigationBackEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';


export default class Lwc_GenericFlowFooterButton extends LightningElement {

    @api approveRejectIdentifier;

    @api navigateToURL;
    @api nextAction;
    @api showFooter;
    @api rejectAction;

    handlePrevious(event){ 
        const previousNavigationEvent = new FlowNavigationBackEvent();
        this.dispatchEvent(previousNavigationEvent);
        
    }
    handleNext(event){
        console.log('In Submit'+this.nextAction);
        console.log('In Submit'+this.rejectAction);
        

        this.approveRejectIdentifier = this.nextAction;
        console.log('In ApproveRejectIdentifier'+this.approveRejectIdentifier);


        const nextNavigationEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(nextNavigationEvent);
    }

    handleReject(event){
        console.log('In Reject'+this.nextAction);
        console.log('In Reject'+this.rejectAction);


        this.approveRejectIdentifier = this.rejectAction;

        console.log('In ApproveRejectIdentifier'+this.approveRejectIdentifier);


        const nextNavigationEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(nextNavigationEvent);
    }


 
    
}