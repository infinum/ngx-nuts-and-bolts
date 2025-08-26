import { FullscreenTriggerForDirective } from "./fullscreen-trigger-for.directive";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DOCUMENT } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'inf-component-with-fullscreen-button',
  template: `
		<button [infFullscreenTriggerFor]="fullscreenElement">Fullscreen</button>
		<div #fullscreenElement>This elemennt to put to fullscreen</div>
	`,
})
class FullscreenTriggerForHostComponent {}

describe('FullscreenTriggerForDirective', () => {
  let directive: FullscreenTriggerForDirective;
  let document: Document;
  let fixture: ComponentFixture<FullscreenTriggerForHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FullscreenTriggerForHostComponent,
        FullscreenTriggerForDirective
      ]
    }).compileComponents();
    document = TestBed.inject(DOCUMENT);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenTriggerForHostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    directive = new FullscreenTriggerForDirective(document);
    expect(directive).toBeTruthy();
  });
});
