public class EmployeeDetailsCustom {

    @AuraEnabled
    public static List<Employee> fetchEmployeeDetails()
    {
        User u = [SELECT Id, contact.AccountId FROM User Where Id=:UserInfo.getUserId() LIMIT 1];
        if(u != null)
        {
            List<Employee> empDetails = [SELECT Id, user.name,user.id,user.email,user.Phone,user.FullPhotoUrl,UserId, EmployeeStatus, EmployeeNumber FROM Employee where UserId =:u.Id Limit 1];
            return empDetails;
        }
        return null;
    }
}