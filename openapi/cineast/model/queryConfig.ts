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


export interface QueryConfig { 
    queryId?: string;
    hints?: Set<QueryConfig.HintsEnum>;
    relevantSegmentIds?: Set<string>;
    distance?: QueryConfig.DistanceEnum;
    distanceWeights?: Array<number>;
    norm?: number;
    resultsPerModule?: number;
    maxResults?: number;
    correspondenceFunctionIfEmpty?: QueryConfig;
    distanceIfEmpty?: QueryConfig;
    correspondenceFunction?: object;
    distanceWeightsIfEmpty?: QueryConfig;
    normIfEmpty?: QueryConfig;
    rawResultsPerModule?: number;
}
export namespace QueryConfig {
    export type HintsEnum = 'exact' | 'inexact' | 'lsh' | 'ecp' | 'mi' | 'pq' | 'sh' | 'va' | 'vaf' | 'vav' | 'sequential' | 'empirical';
    export const HintsEnum = {
        Exact: 'exact' as HintsEnum,
        Inexact: 'inexact' as HintsEnum,
        Lsh: 'lsh' as HintsEnum,
        Ecp: 'ecp' as HintsEnum,
        Mi: 'mi' as HintsEnum,
        Pq: 'pq' as HintsEnum,
        Sh: 'sh' as HintsEnum,
        Va: 'va' as HintsEnum,
        Vaf: 'vaf' as HintsEnum,
        Vav: 'vav' as HintsEnum,
        Sequential: 'sequential' as HintsEnum,
        Empirical: 'empirical' as HintsEnum
    };
    export type DistanceEnum = 'chisquared' | 'correlation' | 'cosine' | 'hamming' | 'jaccard' | 'kullbackleibler' | 'chebyshev' | 'euclidean' | 'squaredeuclidean' | 'manhattan' | 'minkowski' | 'spannorm' | 'haversine';
    export const DistanceEnum = {
        Chisquared: 'chisquared' as DistanceEnum,
        Correlation: 'correlation' as DistanceEnum,
        Cosine: 'cosine' as DistanceEnum,
        Hamming: 'hamming' as DistanceEnum,
        Jaccard: 'jaccard' as DistanceEnum,
        Kullbackleibler: 'kullbackleibler' as DistanceEnum,
        Chebyshev: 'chebyshev' as DistanceEnum,
        Euclidean: 'euclidean' as DistanceEnum,
        Squaredeuclidean: 'squaredeuclidean' as DistanceEnum,
        Manhattan: 'manhattan' as DistanceEnum,
        Minkowski: 'minkowski' as DistanceEnum,
        Spannorm: 'spannorm' as DistanceEnum,
        Haversine: 'haversine' as DistanceEnum
    };
}


