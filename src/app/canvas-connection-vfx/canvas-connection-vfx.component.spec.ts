import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasConnectionVFXComponent } from './canvas-connection-vfx.component';

describe('CanvasConnectionVFXComponent', () => {
  let component: CanvasConnectionVFXComponent;
  let fixture: ComponentFixture<CanvasConnectionVFXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasConnectionVFXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasConnectionVFXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
