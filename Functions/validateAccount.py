import json
from boto3 import resource
from boto3.dynamodb.conditions import Key
dynamodb_resource = resource('dynamodb')

def lambda_handler(event, context):
    
    table = dynamodb_resource.Table('user')
    response = read_table_item(table , 'email', event["email"]);
    if(len(response) > 1 and response['Item']['password'] == event["password"] ):
        
        return {
            "session_id": response['Item']['session_key'],
            "is_valid": True
            
        }
    else:
        return {
           "is_valid": False
        }
    return result


def read_table_item(table, pk_name, pk_value):
    
    response = table.get_item(Key={pk_name: pk_value})
    return response