/**
 * DRES API
 * API for DRES (Distributed Retrieval Evaluation Server), Version 1.0
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { QueryResult } from './queryResult';
import { QueryEvent } from './queryEvent';


export interface QueryResultLog { 
    timestamp: number;
    sortType: string;
    resultSetAvailability: string;
    results: Array<QueryResult>;
    events: Array<QueryEvent>;
}

