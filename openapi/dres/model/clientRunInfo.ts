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


export interface ClientRunInfo { 
    id: string;
    name: string;
    description?: string;
    status: ClientRunInfo.StatusEnum;
}
export namespace ClientRunInfo {
    export type StatusEnum = 'CREATED' | 'ACTIVE' | 'TERMINATED';
    export const StatusEnum = {
        CREATED: 'CREATED' as StatusEnum,
        ACTIVE: 'ACTIVE' as StatusEnum,
        TERMINATED: 'TERMINATED' as StatusEnum
    };
}


