@IsTest
public class KnowledgeSearchControllerTest {

    @testSetup static void setup(){
        List<Knowledge__kav> newKnolwedgeList = new  List<Knowledge__kav>();  
        Knowledge__kav newknow = new Knowledge__kav();
        newknow.Title = 'Test Knowledge Article';
        newknow.urlname = 'test-url-name-knowledge';
        newknow.IsVisibleInCsp= true;
        newknow.IsVisibleInPkb= true;
        newknow.IsVisibleInPrm = true;
        newknow.RecordTypeId = Schema.SObjectType.Knowledge__kav.getRecordTypeInfosByDeveloperName().get('FAQ').getRecordTypeId() ;                   
        
        test.startTest();
        insert newknow;
        
        knowledge__kav knowlegeArticle = [SELECT Id,KnowledgeArticleId FROM knowledge__kav where urlname = 'test-url-name-knowledge'];
        
        Knowledge__DataCategorySelection category = new Knowledge__DataCategorySelection();
        category.DataCategoryGroupName = 'CSP_knowledge_Category';
        category.DataCategoryName  = 'feature_articles';
        category.ParentId = knowlegeArticle.id;
        insert category;
        
        ContentVersion contentVersion = new ContentVersion(
            Title = 'new article doc',
            PathOnClient = 'article.jpg',
            VersionData = Blob.valueOf('Test Content'),
            IsMajorVersion = true
        );
        insert contentVersion;    
        
        List<ProcessInstanceWorkitem> workItems = [
            SELECT Id, ProcessInstanceId 
            FROM ProcessInstanceWorkitem 
            WHERE ProcessInstance.TargetObjectId = :knowlegeArticle.ID 
        ];
        
        List<ContentVersion> contentVersions = new List<ContentVersion>([SELECT Id, ContentDocumentId FROM ContentVersion]);
        
        ContentDocumentLink doc = new ContentDocumentLink();
        doc.ContentDocumentId = contentVersions[0].ContentDocumentId;
        doc.LinkedEntityId = newknow.id;
        doc.ShareType = 'V';
        doc.Visibility ='AllUsers';
        insert doc;
        test.stopTest();
        
    }
    Public testmethod static void fetchKnowledgeWrapperTest() {
     User u = KnowledgeSearchController.getCurrentUserInfo();
        knowledge__kav knowlegeArticle = [SELECT Id,KnowledgeArticleId,PublishStatus  FROM knowledge__kav where urlname = 'test-url-name-knowledge'];
        KnowledgeSearchController.search('Test');
    }
}