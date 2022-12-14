import {Pipe, PipeTransform} from '@angular/core';
import {TemporalObjectSegments} from '../../model/misc/temporalObjectSegments';

@Pipe({
  name: 'LimitPathsPipe'
})
export class LimitPathsPipe implements PipeTransform {
  /**
   * Prunes results from the the input array by omitting all items that come after the specified index.
   *
   * Makes sure that a maximum of count elements is rendered
   *
   * @param array The array of result items.
   * @param count The number of items in the ouput array.
   *
   * @return the elements to be shown, and how many segments are to be rendered for the last element
   */
  public transform(array: Array<TemporalObjectSegments>, count: number): [Array<TemporalObjectSegments>, number] {
    if (!array || array.length === 0 || count === 0) {
      return [[], 0];
    }
    console.debug(`Limiting to ${count} media objects.`);
    const _return: Array<TemporalObjectSegments> = [];
    let _segmentsInLastObj = 0;
    let _segmentCount = 0;
    array.forEach(obj => {
      if (_segmentCount > count) {
        return;
      }
      if (_segmentCount + obj.segments.length > count) {
        _segmentsInLastObj = count - _segmentCount;
      }
      _segmentCount += obj.segments.length;
      _return.push(obj)
    })
    if (_segmentCount <= count) {
      _segmentsInLastObj = _return[_return.length - 1].segments.length
    }
    return [_return, _segmentsInLastObj];
  }
}
