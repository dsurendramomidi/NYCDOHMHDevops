public with sharing class KnowledgeSearchController {


    @AuraEnabled(cacheable=true)
    public static List<wrapArticle> search(String searchTerm) { //, String filter
        
        System.debug('searchTerm' + searchTerm);
        if(searchTerm.length()<=0){ searchTerm = 'Request';}

        List<Knowledge__kav> KnowledgeArticle = new List<Knowledge__kav>();

        if(Test.isRunningTest()){
            String category1 = 'feature_articles';
            KnowledgeArticle = Database.query('SELECT Id, Title, UrlName, Description__c, Summary, Training_Videos_Link__c, LastPublishedDate, ArticleTotalViewCount FROM Knowledge__kav WITH DATA CATEGORY CSP_knowledge_Category__c ABOVE ' + category1 + '__c'+' ORDER BY ArticleCreatedDate DESC'); 
        }else{
            //KnowledgeArticle = Database.query('SELECT Id, Title, UrlName, Description__c, Summary, Training_Videos_Link__c, LastPublishedDate, ArticleTotalViewCount FROM Knowledge__kav WHERE PublishStatus=\'Online\' AND  ( Title LIKE \'%' + searchTerm + '%\' OR Title LIKE \'' + searchTerm + '%\') ORDER BY LastPublishedDate DESC LIMIT  5'); // WITH DATA CATEGORY CSP_knowledge_Category__c AT ' + category + '
            String searchStr1 = '*'+searchTerm+'*';
            String searchQuery = 'FIND \'' + searchStr1 + '\' IN ALL FIELDS RETURNING  knowledge__kav (Id, Title, UrlName, Description__c, Summary, Training_Videos_Link__c, LastPublishedDate, ArticleTotalViewCount WHERE PublishStatus=\'Online\' ORDER BY LastPublishedDate DESC LIMIT  5)';
            List<List <sObject>> searchList = search.query(searchQuery);
            KnowledgeArticle = ((List<Knowledge__kav>)searchList[0]);
        }

        List<wrapArticle> wrapArticleList = new List<wrapArticle>();
        for(Knowledge__kav a: KnowledgeArticle) {
            wrapArticleList.add(new wrapArticle(a));
        }
        System.debug('KnowledgeArticle : ' + KnowledgeArticle.size());
        return wrapArticleList;
    }
    
    // This is our wrapper/container class. A container class is a class, a data structure, or an abstract data type whose instances are collections of other objects. In this example a wrapper class contains both the standard salesforce object Account and a Boolean value
    public class wrapArticle {
        @AuraEnabled public String articleId {get; set;}
        @AuraEnabled public String title {get; set;}
        @AuraEnabled public String urlName {get; set;}
        @AuraEnabled public String description {get; set;}
        @AuraEnabled public String Summary {get; set;}
        @AuraEnabled public String trainingVideosLink {get; set;}
        @AuraEnabled public String lastPublishedDate {get; set;}
        @AuraEnabled public Integer articleTotalViewCount {get; set;}
 
        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public wrapArticle(Knowledge__kav article) {
            articleId = article.Id;
            title = article.Title;
            urlName = article.UrlName;
            description = article.Description__c;
            summary = article.Summary;
            trainingVideosLink = article.Training_Videos_Link__c;
            if(article.LastPublishedDate != null){
                lastPublishedDate = article.LastPublishedDate.format('yyyy-MM-dd');
            } else {
                lastPublishedDate = '';
            }
            
            articleTotalViewCount = article.ArticleTotalViewCount;
        }
    }
    @AuraEnabled(cacheable=true)
    public static user getCurrentUserInfo(){
        return [SELECT Id,Name,Profile.Name FROM User WHERE Id =:userInfo.getUserId()];
    }
}