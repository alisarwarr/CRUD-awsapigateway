import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
//ADD-CORS-OPTIONS
import { addCorsOptions } from '../utils';


export class AwsRestapiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);



    //creating lambdafunction
    const myLambda = new lambda.Function(this, 'myLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: new lambda.AssetCode("lambda"),
      handler: 'index.handler'
    });



    //creating table
    const myTable = new ddb.Table(this, 'myTable', {
      partitionKey: { name: 'id', type: ddb.AttributeType.STRING }
    });



    //for give access to lambdafunction ( to get data from dynamoDB's table )
    myTable.grantReadWriteData(myLambda);
    //for tell lambdafunction ( that this named table consider for storing )
    myLambda.addEnvironment('TABLE_NAME', myTable.tableName);



    //integrate lambdafunction ( with the API Gateway resource )
    const myLambdaIntegration = new apigateway.LambdaIntegration(myLambda);



    //creating restapi
    const myApi = new apigateway.RestApi(this, 'myApi');



    //creating endpoints
    const books = myApi.root.addResource('books');
    books.addMethod('GET', myLambdaIntegration);      //  GET    /books
    books.addMethod('POST', myLambdaIntegration);     //  POST   /books
    addCorsOptions(books);



    //creating endpoints
    const book = myApi.root.addResource('{id}');
    book.addMethod('GET', myLambdaIntegration);       //  GET    /book/{book_id}
    book.addMethod('DELETE', myLambdaIntegration);    //  DELETE /book/{book_id}
    book.addMethod('PATCH', myLambdaIntegration);     //  PATCH  /book/{book_id}
    addCorsOptions(book);
  }
}