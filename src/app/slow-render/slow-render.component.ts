import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-slow-render',
  templateUrl: './slow-render.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlowRenderComponent implements OnInit {
  data: number[] = [];
  @ViewChild('btn') btn: ElementRef = new ElementRef(null);
  @ViewChildren('li', { read: ElementRef }) elements: QueryList<ElementRef> = new QueryList();

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    
    interval(50).subscribe(() => {
      this.btn.nativeElement.click();
      this.elements.changes.subscribe(elements => {
        fromEvent(document, 'mousemove').subscribe();
        elements.last.nativeElement.style.backgroundColor = 'red';
        elements.last.nativeElement.scrollIntoView();
    });
  });

    this.dataService.data$.subscribe(data => {
      this.data = data;
      this.cdr.markForCheck();
    });
    this.dataService.updateData();
  }

  addData() {
    const randomItem = Math.floor(Math.random() * 1000);
    this.dataService.addData(randomItem);
  }

  getColor(item: number): string {
    return item % 2 === 0 ? 'lightblue' : 'lightgreen';
  }
  
}
