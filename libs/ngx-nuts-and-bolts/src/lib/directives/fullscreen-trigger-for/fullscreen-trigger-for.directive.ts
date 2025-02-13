import {
  Directive,
  HostListener,
  Inject,
  Input,
  OnDestroy,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Directive({
  selector: '[infFullscreenTriggerFor]',
  exportAs: 'infFullscreen'
})
export class FullscreenTriggerForDirective implements OnDestroy {

  @Input() public infFullscreenTriggerFor!: HTMLElement;

  public isFullscreen = false;

  @HostListener('click', ['$event'])
  public onClick(): void {
    if (this.document.fullscreenElement && this.document.exitFullscreen) {
      this.document.exitFullscreen();
      return;
    }

    this.infFullscreenTriggerFor.requestFullscreen();
  }

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  public onFullscreenChange(): void {
    this.isFullscreen = Boolean(this.document.fullscreenElement);
  }

  public ngOnDestroy() {
    if (this.document.fullscreenElement) {
      this.document.exitFullscreen();
    }
  }

}
