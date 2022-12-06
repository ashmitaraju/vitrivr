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
import { MediaSegmentMetadataDescriptor } from './mediaSegmentMetadataDescriptor';


export interface MediaSegmentMetadataQueryResult { 
    queryId?: string;
    content?: Array<MediaSegmentMetadataDescriptor>;
    messageType?: MediaSegmentMetadataQueryResult.MessageTypeEnum;
}
export namespace MediaSegmentMetadataQueryResult {
    export type MessageTypeEnum = 'PING' | 'Q_SIM' | 'Q_MLT' | 'Q_NESEG' | 'Q_SEG' | 'Q_TEMPORAL' | 'SESSION_START' | 'QR_START' | 'QR_END' | 'QR_ERROR' | 'QR_OBJECT' | 'QR_METADATA_O' | 'QR_METADATA_S' | 'QR_SEGMENT' | 'QR_SIMILARITY' | 'QR_TEMPORAL';
    export const MessageTypeEnum = {
        Ping: 'PING' as MessageTypeEnum,
        QSim: 'Q_SIM' as MessageTypeEnum,
        QMlt: 'Q_MLT' as MessageTypeEnum,
        QNeseg: 'Q_NESEG' as MessageTypeEnum,
        QSeg: 'Q_SEG' as MessageTypeEnum,
        QTemporal: 'Q_TEMPORAL' as MessageTypeEnum,
        SessionStart: 'SESSION_START' as MessageTypeEnum,
        QrStart: 'QR_START' as MessageTypeEnum,
        QrEnd: 'QR_END' as MessageTypeEnum,
        QrError: 'QR_ERROR' as MessageTypeEnum,
        QrObject: 'QR_OBJECT' as MessageTypeEnum,
        QrMetadataO: 'QR_METADATA_O' as MessageTypeEnum,
        QrMetadataS: 'QR_METADATA_S' as MessageTypeEnum,
        QrSegment: 'QR_SEGMENT' as MessageTypeEnum,
        QrSimilarity: 'QR_SIMILARITY' as MessageTypeEnum,
        QrTemporal: 'QR_TEMPORAL' as MessageTypeEnum
    };
}


