({
    onInit: function (cmp, event, helper) {

        helper.doInitHelper(cmp, event,'feature_articles');
        helper.doInitHelper(cmp, event,'user_guides');
        helper.doInitHelper(cmp, event,'training_videos');

    },
    /* javaScript function for pagination Feature Articles */
    navigation: function(component, event, helper) {
            var sObjectList = component.get("v.listOfAllFeatureArticles");
            var end = component.get("v.endPage");
            var start = component.get("v.startPage");
            var pageSize = component.get("v.pageSize");
            var typeValue = 'featuredarticles';
            component.set("v.currentPage", component.get("v.currentPage") + 1);
            helper.loadmore(component, event, sObjectList, end, start, pageSize,typeValue);
    },
    /* javaScript function for pagination User Guides */
    navigationUG: function(component, event, helper) {
            var sObjectList = component.get("v.listOfAllUserGuides");
            var end = component.get("v.endPageUG");
            var start = component.get("v.startPageUG");
            var pageSize = component.get("v.pageSizeUG");
            var typeValue = 'userguides';
            component.set("v.currentPageUG", component.get("v.currentPageUG") + 1);
            helper.loadmore(component, event, sObjectList, end, start, pageSize,typeValue);
    },
    /* javaScript function for pagination Training Videos */
    navigationTR: function(component, event, helper) {
            var sObjectList = component.get("v.listOfAllTrainingVideos");
            var end = component.get("v.endPageTR");
            var start = component.get("v.startPageTR");
            var pageSize = component.get("v.pageSizeTR");
            var typeValue = 'trainingvideos';
            component.set("v.currentPageTR", component.get("v.currentPageTR") + 1);
            helper.loadmore(component, event, sObjectList, end, start, pageSize, typeValue);
    },

    gotoTop : function(component, event, helper) {
        var scrollOptions = {
            left: 0,
            top: 0,
            behavior: 'smooth'
            }
            window.scrollTo(scrollOptions);
    },
    gotoArticle: function(component, event, helper) {
        var articleURLName = event.currentTarget.dataset.id;
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/article/"+articleURLName,
            "isredirect" :true
        });
            console.log('+++articleURLName'+articleURLName);
            
        urlEvent.fire();
    },
})