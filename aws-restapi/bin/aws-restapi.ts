#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsRestapiStack } from '../lib/aws-restapi-stack';

const app = new cdk.App();
new AwsRestapiStack(app, 'AwsRestapiStacks');