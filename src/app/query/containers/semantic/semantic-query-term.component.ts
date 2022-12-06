import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ResolverService} from '../../../core/basics/resolver.service';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {SemanticSketchDialogComponent} from './semantic-sketch-dialog.component';
import {SemanticQueryTerm} from '../../../shared/model/queries/semantic/semantic-query-term.model';
import {SemanticMap} from '../../../shared/model/queries/semantic/semantic-map.model';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import { SemanticCategory } from 'app/shared/model/queries/semantic/semantic-category.model';
import {FormControl} from '@angular/forms';

// import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SketchCanvasComponent} from '../../../shared/components/sketch/sketch-canvas.component';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-qt-semantic',
  templateUrl: 'semantic-query-term.component.html',
  styleUrls: ['semantic-query-term.component.css']
})
export class SemanticQueryTermComponent implements OnInit {

  /** Component used to display a preview of the selected AND/OR sketched image. */
  @ViewChild('previewimg', {static: true})
  private previewimg: any;

  private _categories: SemanticCategory[] = SemanticCategory.LIST;

  public readonly formCtrl = new FormControl();

  /** The SemanticQueryTerm object associated with this SemanticQueryTermComponent. That object holds all the query-settings. */
  @Input()
  private semanticTerm: SemanticQueryTerm;

  /** Currently selected SemanticCategory (pencil) */
  private _selected: SemanticCategory = this._categories[0];
  _usedSet: Set<SemanticCategory> = new Set();

  private _used: BehaviorSubject<SemanticCategory[]> = new BehaviorSubject([]);
  

  readonly _filteredCategories: Observable<SemanticCategory[]>;

  constructor(private _dialog: MatDialog, private _resolver: ResolverService, private _http: HttpClient) {
    const filtered = this.formCtrl.valueChanges.pipe(
      startWith(''),
      map(filter => filter.toLowerCase()),
      map(filter => {
        if (filter) {
          return this._categories.filter(v => v.name.toLowerCase().indexOf(filter) === 0);
        } else {
          return this._categories;
        }
      })
    );
    this._filteredCategories = combineLatest([filtered, this._used]).pipe(
        map((array: [SemanticCategory[], SemanticCategory[]]) => {
        return array[0].sort((a, b) => {
          const ia = array[1].indexOf(a);
          const ib = array[1].indexOf(b);
          if (ia === -1 && ib !== -1) {
            return 1;
          } else if (ia !== -1 && ib === -1) {
            return -1;
          } else if (a.name < b.name) {
            return -1
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        })
      })
    );
  }


  ngOnInit(): void {
    if (this.semanticTerm.image) {
      this.previewimg.nativeElement.src = this.semanticTerm.image;
    }
  }

  /**
   * Triggered whenever someone click on the image, which indicates that
   * it should be edited; opens the SketchDialogComponent
   */
  public onViewerClicked() {
    if (this.semanticTerm.data && this.semanticTerm.map.length > 0) {
      this.openSketchDialog(new SemanticMap(this.semanticTerm.image, this.semanticTerm.map));
    } else {
      this.openSketchDialog();
    }
  }

  public onItemSelected(selection: SemanticCategory) {
    this._selected = selection;
   //this._sketchpad.setActiveColor(selection.color);
    const arr = this._used.getValue().concat().slice();
    if (arr.indexOf(selection) === -1) {
      arr.push(selection);
      this._used.next(arr);
    }
  }

  public onOptionSelected(selected: string) {
    for (const category of this._categories) {
      if (category.name === selected) {
        this.onItemSelected(category);
        break;
      }
    }
  }

  /**
   * Opens the SketchDialogComponent and registers a callback that loads the saved
   * result of the dialog into preview image canvas.
   *
   * @param data Optional data that should be handed to the component.
   */
  private openSketchDialog(data?: SemanticMap) {
    /* Prepare config & initialize the correct dialog-component. */
    const config = new MatDialogConfig<SemanticMap>();
    config.height = '450px';
    config.data = data;

    const dialogRef = this._dialog.open(SemanticSketchDialogComponent, config);

    /* Register the onClose callback. */
    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if (result instanceof SemanticMap) {
        this.semanticTerm.image = result.image;
        this.semanticTerm.map = result.map;
        this.previewimg.nativeElement.src = result.image;
      }
    });
  }
}
