import json
from boto3 import resource
from boto3.dynamodb.conditions import Key
dynamodb_resource = resource('dynamodb')

def lambda_handler(event, context):
    
    table = dynamodb_resource.Table('user')
    response = read_table_item(table ,  event['name'])
    print(response)
    if(response!=[]):
        return {
            "count":len(response),
            "result":response}
    else:
        return {
            "count":0
            
        }
        
        


def read_table_item(table, pk_value):
    result={}
    index=0
    response = table.scan()
    for i in range(0,response['Count']):
        if(response['Items'][i]['email']==pk_value or response['Items'][i]['username']==pk_value):
            response['Items'][i].pop('password')
            response['Items'][i].pop('session_key')
            response['Items'][i].pop('dateofbirth')
            result[index]= response['Items'][i]
            index+=1
            
    return result
    
 