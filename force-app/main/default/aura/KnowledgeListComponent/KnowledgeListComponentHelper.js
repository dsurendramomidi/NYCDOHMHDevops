({
    /* doInitHelper funcation to fetch all records, and set attributes value on component load */
    doInitHelper : function(component,event,selectedCategory){
	    var action = component.get("c.fetchKnowledgeWrapper");       
        action.setParams({category:selectedCategory});
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log("response valuex"+JSON.stringify(response.getReturnValue()));
            if (state === "SUCCESS"){
                var oRes = response.getReturnValue();
                if(oRes.length > 0){  
                    var maxCount = component.get("v.totalRecordsCountMax");
					if(oRes.length > maxCount)
                    {
                        oRes = oRes.slice(0,maxCount);
                    }
                    if(selectedCategory == 'training_videos')
                    {
                        console.log('inside category training video'+oRes);
                        var pageSizeTR = component.get("v.pageSizeTR");
                        var totalRecordsListTR = oRes;
                        var totalLengthTR = totalRecordsListTR.length;
                        component.set('v.listOfAllTrainingVideos', oRes);
                        if(totalLengthTR > 0)
                        {
                            component.set("v.totalRecordsCountTR", totalLengthTR);
                            component.set("v.startPageTR",0);
                            component.set("v.endPageTR",pageSizeTR-1);
                            
                            var trainingVideoLinks = [];
                            for(var i=0; i < pageSizeTR; i++){
                                if(component.get("v.listOfAllTrainingVideos").length > i){
                                    trainingVideoLinks.push(oRes[i]);    
                                } 
                            }
                            component.set('v.trainingVideoLinks', trainingVideoLinks);
                            component.set("v.selectedCountTR" , 0);
                            component.set("v.totalPagesCountTR", Math.ceil(totalLengthTR / pageSizeTR));                        
                        }
                        else{
                           component.set("v.bNoRecordsFoundTR" , true); 
                        }
                    }                        

                    if(selectedCategory == 'user_guides')
                    {
                        console.log('inside category user guide'+oRes);
                        component.set('v.listOfAllUserGuides', oRes);
                        var pageSizeUG = component.get("v.pageSizeUG");
                        var totalRecordsListUG = oRes;
                        var totalLengthUG = totalRecordsListUG.length ;
                        if(totalLengthUG > 0)
                        {
                            component.set("v.totalRecordsCountUG", totalLengthUG);
                            component.set("v.startPageUG",0);
                            component.set("v.endPageUG",pageSizeUG-1);
                            
                            var userGuideLinks = [];
                            for(var i=0; i < pageSizeUG; i++){
                                if(component.get("v.listOfAllUserGuides").length > i){
                                    userGuideLinks.push(oRes[i]);    
                                } 
                            }
                            component.set('v.userGuideLinks', userGuideLinks);
                            component.set("v.selectedCountUG" , 0);
                            component.set("v.totalPagesCountUG", Math.ceil(totalLengthUG / pageSizeUG));                        
                        }
                        else
                        {
                           component.set("v.bNoRecordsFoundUG" , true);                             
                        }
                    }                        
                    if(selectedCategory == 'feature_articles')
                    {
                        console.log('inside category feature articles'+oRes);
                        component.set('v.listOfAllFeatureArticles', oRes);
                        var pageSize = component.get("v.pageSize");
                        var totalRecordsList = oRes;
                        var totalLength = totalRecordsList.length ;
                        if(totalLength > 0)
                        {
                            component.set("v.totalRecordsCount", totalLength);
                            component.set("v.startPage",0);
                            component.set("v.endPage",pageSize-1);
                            
                            var featuredArticleLinks = [];
                            for(var i=0; i < pageSize; i++){
                                if(component.get("v.listOfAllFeatureArticles").length > i){
                                    featuredArticleLinks.push(oRes[i]);    
                                } 
                            }
                            component.set('v.featuredArticleLinks', featuredArticleLinks);
                            component.set("v.selectedCount" , 0);
                            component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));
                        }
                        else
                        {
                            component.set("v.bNoRecordsFound" , true);                                                        
                        }
                    }     
                }else{
                    // if there is no records then display message
                    component.set("v.bNoRecordsFound" , true);
                } 
            }
        });
        $A.enqueueAction(action);  
    },
    // navigate to load more pagination record set   
    loadmore : function(component,event,sObjectList,end,start,pageSize, typeValue){
        var counter = 0; var typeLinks = '';
        // Feature Articles
        if(typeValue == 'featuredarticles') 
        { 
            typeLinks = component.get("v.featuredArticleLinks"); 
        }
        if(typeValue == 'userguides') 
        { 
            typeLinks = component.get("v.userGuideLinks"); 
        }
        if(typeValue == 'trainingvideos') 
        { 
            typeLinks = component.get("v.trainingVideoLinks"); 
        }

        for(var i = end + 1; i < end + pageSize + 1; i++){
            if(sObjectList.length > i){ 
                typeLinks.push(sObjectList[i]);               
            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        if(typeValue == 'featuredarticles')
        { 
            component.set("v.startPage",start); 
            component.set("v.endPage",end); 
            component.set('v.featuredArticleLinks', typeLinks); 
        }
        if(typeValue == 'userguides') 
        {
            component.set("v.startPageUG",start); 
            component.set("v.endPageUG",end); 
            component.set('v.userGuideLinks', typeLinks); 
        }
        if(typeValue == 'trainingvideos') 
        { 
            component.set("v.startPageTR",start); 
            component.set("v.endPageTR",end); 
            component.set('v.trainingVideoLinks', typeLinks); 
        }

    },
})