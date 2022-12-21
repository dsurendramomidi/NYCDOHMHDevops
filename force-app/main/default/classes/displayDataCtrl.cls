public class displayDataCtrl {
      @AuraEnabled
      public static List<ServiceRequest__c> oppListData() {
        List<ServiceRequest__c> oppList = [SELECT Id, Name, Type__c FROM ServiceRequest__c ORDER BY createdDate ASC];
          return oppList;
      }
    
}