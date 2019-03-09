import boto3
from boto3 import resource
from boto3.dynamodb.conditions import Key
dynamodb_resource = resource('dynamodb')

USER_POOL_ID = 'us-east-2_UXt86tjZA'
#CLIENT_ID = '14n7946ohgqhvmevsclrej11nj'
#CLIENT_SECRET = 'ea6ojfa9tpao6c39qkhrnvs9oo2acp5fdev5k6tstqeh4rgvu6c'

def lambda_handler(event, context):
    client = boto3.client('cognito-idp')
    body = event
    email = "87950"+body['email']
    username = body['username']
    password = "default Password"#body['password']
    
    try:
        response = client.admin_create_user(
        UserPoolId=USER_POOL_ID,
        Username=email,
        UserAttributes=[
        {
            'Name': 'name',
            'Value': username
        }
    ],
        TemporaryPassword=password
        )
    except client.exceptions.UsernameExistsException:
        return {
            "status":"User Exists"
            }
    add_item({"id":response['User']['Username']})
    return {
            "status":"Success",
            "id":response['User']['Username'],
            "name":response['User']['Attributes'][1]['Value']
            }
        
def add_item( col_dict):
    
    table = dynamodb_resource.Table('users_cognito')
    response = table.put_item(Item=col_dict)
    return response
