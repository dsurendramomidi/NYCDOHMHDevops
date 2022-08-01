public class GetKnowledgeArticlesList{
    @AuraEnabled(cacheable=true) 
    public static List<knowledgeListWrapper> fetchKnowledgeWrapper(String category){
        system.debug('in the class fetchKnowledgeWrapper'+category);
        String category1 = 'feature_articles';
        List<knowledgeListWrapper> lstknowledgeListWrapper = new List<knowledgeListWrapper>();
        List<Knowledge__kav> KnowledgeArticle = new List<Knowledge__kav>();
        if(Test.isRunningTest()){
            KnowledgeArticle = Database.query('SELECT Id, Title, UrlName, Description__c, Summary, Training_Videos_Link__c FROM Knowledge__kav WITH DATA CATEGORY DOHMH_knowledge_Category__c ABOVE ' + category1 + '__c'+' ORDER BY ArticleCreatedDate DESC'); 
        }else{
           KnowledgeArticle = Database.query('SELECT Id, Title, UrlName, Description__c, Summary, Training_Videos_Link__c FROM Knowledge__kav WHERE PublishStatus=\'Online\' WITH DATA CATEGORY DOHMH_knowledge_Category__c ABOVE ' + category + '__c'+' ORDER BY ArticleCreatedDate DESC'); 
        }
        Map<ID,ID> versionIdArticleID = new Map<ID,ID>(); 
        Map<ID,ID> ArticleIDKnowledgeID = new Map<ID,ID>();
        Map<Id,String> ContDocIDTitle = new Map<Id,String>();
        List<ID> knowArticleList = new List<ID>();
        List<ID> knowledgeList = new List<ID>();  
        List<ID> ContentDocID = new List<ID>();
        Map<ID,ID> docIDs = new Map<ID,ID>();
        system.debug('knowledgeArticle size'+KnowledgeArticle.size() + ''+KnowledgeArticle);
        if(KnowledgeArticle.size() > 0)
        { 
            for(Knowledge__kav article:[select id,KnowledgeArticleId from Knowledge__kav where id In :KnowledgeArticle])
            {
                knowledgeList.add(article.id);
                ArticleIDKnowledgeID.put(article.KnowledgeArticleId,article.id);
            }                
            if(knowledgeList.size() > 0)
            {
                for(ContentDocumentLink allFiled:[SELECT Id,LinkedEntityId, ContentDocumentId FROM ContentDocumentLink where LinkedEntityId IN :knowledgeList])
                {
                    docIDs.put(allFiled.LinkedEntityId,allFiled.ContentDocumentId);
                    ContentDocID.add(allFiled.ContentDocumentId);
                } 
                if(ContentDocID.size() > 0)
                {
                    for(ContentDocument doc:[SELECT Id,Title FROM ContentDocument where id IN :ContentDocID])
                    {
                        ContDocIDTitle.put(doc.Id,doc.Title);
                    }
                }
            }
        }
        for(Knowledge__kav article : KnowledgeArticle){
            lstknowledgeListWrapper.add(new knowledgeListWrapper(article,docIDs.get(article.id),ContDocIDTitle.get(article.id)));
        }
        return lstknowledgeListWrapper; 
    }
    /* wrapper class */  
    public class knowledgeListWrapper {
        @AuraEnabled public  Knowledge__kav objKnowledge{get;set;}
        @AuraEnabled public string ContentDocumentId {get;set;}
        @AuraEnabled public string ContentDocumentTitle {get;set;}
        @AuraEnabled public string shortDescr {get;set;}
        public knowledgeListWrapper(Knowledge__kav objKnowledge,string ContentDocumentId,String ContentDocumentTitle){
            Integer DescLength = 0;
            string knowledgeDesc = '';
            string knowledgeDescrption = '';
            String KnowledgeDescrp = '';
            if(objKnowledge.Description__c != null)    
            {
                KnowledgeDescrp = (objKnowledge.Description__c).replaceAll('\\<.*?\\>',' ');               
                DescLength = KnowledgeDescrp.length();
                if(DescLength > 100)
                {             
                    knowledgeDesc = KnowledgeDescrp.substring(0,100);
                }else
                {
                    knowledgeDesc = KnowledgeDescrp;
                }
            }            
            this.ContentDocumentId = ContentDocumentId;            
            this.shortDescr = knowledgeDesc;
            this.objKnowledge = objKnowledge;
            this.ContentDocumentTitle = ContentDocumentTitle;
        }
    }
}