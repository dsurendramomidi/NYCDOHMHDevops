({    
    doInit: function(component, event, helper) {
        var navigateto = component.get("v.navigateto");
        if(navigateto == 'sObject'){
            // Get the record ID attribute
            var record = component.get("v.recordId");
            
            // Get the Lightning event that opens a record in a new tab
            var redirect = $A.get("e.force:navigateToSObject");
            
            // Pass the record ID to the event
            redirect.setParams({
                "recordId": record
            });
            
            // Open the record
            redirect.fire();
        }else if(navigateto == 'URL'){
            
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": "/"+component.get("v.url")
            });
            urlEvent.fire();
            $A.get('e.force:refreshView').fire();
        }
    },

    
    invoke: function(component, event, helper) {
        var navigateto = component.get("v.navigateto");
        if(navigateto == 'sObject'){
            // Get the record ID attribute
            var record = component.get("v.recordId");
            
            // Get the Lightning event that opens a record in a new tab
            var redirect = $A.get("e.force:navigateToSObject");
            
            // Pass the record ID to the event
            redirect.setParams({
                "recordId": record
            });
            
            // Open the record
            redirect.fire();
        }else if(navigateto == 'URL'){
            
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": "/" + component.get("v.url"),
                "isredirect": "true"
            });
            urlEvent.fire();
            $A.get('e.force:refreshView').fire();

        }else if(navigateto == 'CommunityURL'){
            
            let navService = component.find("navService");
            let pageReference = {
            type: "comm__namedPage", 
            attributes: {
                pageName: component.get("v.url") // pageName must be lower case
                }
            }
            navService.navigate(pageReference);
        }
    }
    
})