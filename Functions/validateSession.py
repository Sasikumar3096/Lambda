import json
from boto3 import resource
from boto3.dynamodb.conditions import Key
dynamodb_resource = resource('dynamodb')

def lambda_handler(event, context):
    
    table = dynamodb_resource.Table('user')
    result,response = read_table_item(table ,  event['session_key'])
    if(result):
        return {
             "user_id": response['email'],
             "is_valid": True, 
             "user_profile_data": {
                "email": response['email'],
                "username":response['username'],
                "dateofbirth":response['dateofbirth']

            }
        }
        
    else:
        
        return {
             "is_valid": False, 
            "user_profile_data": {}
        }
        


def read_table_item(table, pk_value):
    response = table.scan()
    for i in range(0,response['Count']):
        if(response['Items'][i]['session_key']==pk_value):
            return True,response['Items'][i]
    return False,False
    
 