import json
from boto3 import resource
from boto3.dynamodb.conditions import Key
dynamodb_resource = resource('dynamodb')

def lambda_handler(event, context):
    
    result=''
    session_key =abs(hash(event['email']))
    event['session_key'] = str(session_key)
    table = dynamodb_resource.Table('user')
    if( read_table_item(table , 'email', event['email']) > 1):
        return {
            "status" :"exists",
            "sessionkey":"",
            "email":"",
            "usercreated":"false"
            
        }
    else:
        add_item(table,event)
        return {
            "status" :"success",
            "sessionkey":session_key,
            "email":event['email'],
            "usercreated":"true"
        }



def read_table_item(table, pk_name, pk_value):
    
    response = table.get_item(Key={pk_name: pk_value})
    return len(response)
    
def add_item(table, col_dict):
    response = table.put_item(Item=col_dict)
    return response