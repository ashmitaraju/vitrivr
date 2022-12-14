/**
 * Cineast RESTful API
 * Cineast is vitrivr\'s content-based multimedia retrieval engine. This is it\'s RESTful API.
 *
 * The version of the OpenAPI document: v1
 * Contact: contact@vitrivr.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface SessionState { 
    id?: string;
    validUntil?: number;
    type?: SessionState.TypeEnum;
}
export namespace SessionState {
    export type TypeEnum = 'UNAUTHENTICATED' | 'USER' | 'ADMIN';
    export const TypeEnum = {
        Unauthenticated: 'UNAUTHENTICATED' as TypeEnum,
        User: 'USER' as TypeEnum,
        Admin: 'ADMIN' as TypeEnum
    };
}


