import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { NgLoadingButtonService } from './ng-loading-button.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ng-loading-button',
  templateUrl: './ng-loading-button.component.html',
  styleUrls: ['./ng-loading-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NgLoadingButtonComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() theme = 'standart';
  @Input() type = 'default';
  @Input() id;
  @Input() loadingType = 'text';
  @Input() class = '';
  @Input() style = '';
  @Input() loadingText = 'Processing...';

  loadingTextDivWidth = '';

  buttonClassSubject: Subject<any> = new Subject<any>();
  buttonClass = [];

  buttonStylesSubject: Subject<any> = new Subject<any>();
  buttonStyles = [];

  loadingSubject: Subject<boolean> = new Subject<boolean>();
  loading: boolean = false;

  innerTextSubject: Subject<string> = new Subject<string>();
  innerText: string = '';

  constructor(
    private ngLoadingButtonService: NgLoadingButtonService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.loadingSubject.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
      this.loading = loading;
    });

    this.buttonClassSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((buttonClass) => {
        this.buttonClass = buttonClass;
        this.renderer.setAttribute(
          this.el.nativeElement,
          'class',
          this.buttonClass.join(' ')
        );
      });

    this.buttonStylesSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((buttonStyles) => {
        buttonStyles.forEach((buttonStyle) => {
          const key = Object.keys(buttonStyle)[0];
          const val = buttonStyle[key];
          if (key.startsWith('--')) {
            this.el.nativeElement.style.setProperty(key, val);
          } else {
            this.renderer.setStyle(this.el.nativeElement, key, val);
          }
        });
      });

    this.innerTextSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((innerText) => {
        this.innerText = innerText;
        this.el.nativeElement.innerText = innerText;
      });
  }

  ngOnInit(): void {
    // if (this.id === null || this.id === undefined) {
    //   throw new TypeError("The input 'id' is required");
    // }

    this.setButtonClass();

    const styles = window.getComputedStyle(this.el.nativeElement);

    const padding = styles.getPropertyValue('padding');
    const color = styles.getPropertyValue('color');
    if (this.class) {
      this.style = `color:${color};border:none;background:none;padding:${
        !padding || '0'
      }`;
    } else {
      this.style = this.style.replace(/padding: .*;/, `padding: 0;`);
    }

    this.buttonStyles.push({ color: styles.getPropertyValue('color') });
    this.buttonStyles.push({ width: styles.getPropertyValue('width') });
    this.buttonStyles.push({ height: styles.getPropertyValue('height') });
  }

  ngAfterViewInit(): void {
    this.innerText = this.el.nativeElement.innerText;

    const offsetWidth = this.el.nativeElement.offsetWidth;
    this.el.nativeElement.style.width = offsetWidth;

    this.ngLoadingButtonService.setButtonRef(
      this.el,
      this.id,
      this.loadingSubject,
      this.buttonClassSubject,
      this.buttonClass,
      this.loadingType,
      this.type,
      this.buttonStylesSubject,
      this.buttonStyles,
      this.innerTextSubject,
      this.innerText,
      this.loadingText
    );
  }

  setButtonClass() {
    this.buttonClass = this.class.split(' ');
  }

  ngOnDestroy() {
    this.ngLoadingButtonService.clearButtonRefs();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
