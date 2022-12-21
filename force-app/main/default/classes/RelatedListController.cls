public with sharing class RelatedListController {

        @AuraEnabled( cacheable=true )
        public static RelatedListWrapper fetchRecords( String listValues )  { 
        
                system.debug( 'values are ' + listValues ); 
                List < String > strList = listValues.split( '-' ); 
                system.debug( 'values are ' + strList ); 
                RelatedListWrapper objWrap = new RelatedListWrapper();
                 
                if ( strList.size() == 8 ) { 
                 
                    String recordId = strList.get( 0 ); 
                    String objectName = strList.get( 1 ); 
                    String parentFieldAPIName = strList.get( 2 ); 
                    String fieldName = strList.get( 3 ); 
                    String fieldValue = strList.get( 4 ); 
                    String filterType = strList.get( 5 ); 
                    String operator = strList.get( 6 ); 
                    String fieldsList = strList.get( 7 ); 
                    recordId = '\''+ recordId + '\'';
                    //String fieldValStr = '\''+ fieldValue + '\'';

                    String strSOQL = 'SELECT Id';
                    strSOQL += ', ' + fieldsList;
                    String filter = ' FROM ' + objectName + ' WHERE ' + parentFieldAPIName + ' = ' + recordId + ' AND '; 
                    if ( filterType == 'String' )     
                        filter += fieldName + ' ' + operator + ' ' + fieldValue; 
                    else if ( filterType == 'Boolean' )     
                        filter += fieldName + ' = ' + fieldValue; 
                    else 
                        filter += fieldName + ' ' + operator + ' ' + fieldValue; 
                    System.debug('filter value'+filter);    
                    String strCountSOQL = ' SELECT COUNT() ' + filter;
                    System.debug('strCountSOQL value'+strCountSOQL);   
                    objWrap.recordCount = Database.countQuery( strCountSOQL );
                    strSOQL += filter + ' LIMIT 3';     
                    objWrap.listRecords = Database.query( strSOQL ); 
                    System.debug('strSOQL value'+strSOQL);    
                }   
                return objWrap; 
                 
            } 
        
        
            public class RelatedListWrapper {
        
                @AuraEnabled
                public List < SObject > listRecords;
                @AuraEnabled
                public Integer recordCount;
        
            }
                 
        }