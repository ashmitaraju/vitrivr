import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterModule} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuerySideBarService {

  constructor(private http: HttpClient) { }

  queryEVA() {

    const body = {
        "bbox":[23,23,23,23],
        "predicate": "kohli",
        "frame": 2, 
        "startFrame": 1,
        "endFrame": 2,
        "task": "ocr",
    };

    return this.http.post("http://localhost:5001/api/queryevaocr/", body)
  }

}