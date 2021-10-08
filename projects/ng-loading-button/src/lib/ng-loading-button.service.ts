import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgLoadingButtonService {
  buttonRefs = [];

  constructor() {}

  clearButtonRefs() {
    this.buttonRefs = [];
  }

  setButtonRef(
    buttonElement: ElementRef,
    buttonId: string,
    buttonLoadingAttr: Subject<boolean>,
    buttonClassSubject: Subject<any>,
    buttonClass: string[],
    buttonLoadingType: string,
    buttonType: string,
    buttonStylesSubject: Subject<any>,
    buttonStyles: any[],
    innerTextSubject: Subject<string>,
    innerText: string,
    loadingText: string
  ) {
    this.buttonRefs.push({
      buttonElement,
      buttonId,
      buttonLoadingAttr,
      buttonClassSubject,
      buttonClass,
      buttonLoadingType,
      buttonType,
      buttonStylesSubject,
      buttonStyles,
      innerTextSubject,
      innerText,
      loadingText,
    });
  }

  showLoading(buttonId: string) {
    const actualButton = this.buttonRefs.find(
      (button) => button.buttonId === buttonId
    );

    if (actualButton) {
      const styles = window.getComputedStyle(
        actualButton.buttonElement.nativeElement
      );

      // set loading to true
      actualButton.buttonLoadingAttr.next(true);

      if (actualButton.buttonLoadingType === 'spinner') {
        const actualButtonClass = actualButton.buttonClass;

        actualButton.buttonStylesSubject.next([
          { '--btn-text-color': styles.getPropertyValue('color') },
          { position: 'relative' },
          { '--btn-width': actualButton.buttonElement.offsetWidth },
        ]);

        actualButtonClass.push(`btn--loading`);
        actualButtonClass.push(`btn-disabled`);
        actualButton.buttonClassSubject.next(actualButtonClass);
      } else {
        actualButton.buttonStylesSubject.next([
          { position: 'relative' },
          {
            '--btn-width': `${actualButton.buttonElement.nativeElement.offsetWidth}px`,
          },
        ]);

        actualButton.innerTextSubject.next(actualButton.loadingText);
      }
    }
  }

  hideLoading(buttonId: string) {
    const actualButton = this.buttonRefs.find(
      (button) => button.buttonId === buttonId
    );

    if (actualButton) {
      // set loading to false
      actualButton.buttonLoadingAttr.next(false);

      if (actualButton.buttonLoadingType === 'spinner') {
        const actualButtonClass = actualButton.buttonClass.filter(
          (btnClass) =>
            btnClass !== `btn--loading` && btnClass !== 'btn-disabled'
        );
        actualButton.buttonClass = actualButtonClass;
        actualButton.buttonClassSubject.next(actualButtonClass);
        const actualButtonIndex = this.buttonRefs.findIndex(
          (button) => button.buttonId === buttonId
        );
        this.buttonRefs[actualButtonIndex] = actualButton;
      } else {
        actualButton.innerTextSubject.next(actualButton.innerText);
      }
    }
  }
}
