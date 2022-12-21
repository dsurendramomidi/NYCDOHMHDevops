({
	 // Fetch the Opportunity from the Apex controller
      getOppList: function(component, event, helper) {
        var action = component.get('c.oppListData');          
        action.setCallback(this, function(response){
            var state = response.getState();      
            //alert('state ' + state);
            if(state == "SUCCESS"){
                var result = response.getReturnValue();
                //alert('result ' + JSON.stringify(result));                
                component.set('v.opportunity',result);
            }
        });
        $A.enqueueAction(action);
      }
    
})