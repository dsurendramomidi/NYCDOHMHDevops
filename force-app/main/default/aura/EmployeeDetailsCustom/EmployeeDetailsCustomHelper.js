({
	doInitHelper : function(component,event) {
        var action = component.get("c.fetchEmployeeDetails");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS"){
                var employeeData = response.getReturnValue();
                component.set("v.employeeData",employeeData);
                console.log('employee Data :'+JSON.stringify(employeeData));
            }                
        });
        $A.enqueueAction(action);		
	}
})