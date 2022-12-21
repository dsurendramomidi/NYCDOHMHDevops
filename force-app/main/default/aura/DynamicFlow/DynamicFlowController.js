({
	doInit: function(component, event, helper) {   
    // Fetch the Opportunity list from the Apex controller 
      helper.getOppList(component);
   },
    btnClicked: function(component, event, helper) {
        var idx = event.target.id;
        //alert(idx);               
		var flow = component.find("flowData");
    	flow.startFlow(idx);
        $A.get('e.force:refreshView').fire();
   }
})