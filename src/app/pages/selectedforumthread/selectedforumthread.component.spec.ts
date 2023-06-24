import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedforumthreadComponent } from './selectedforumthread.component';

describe('SelectedforumthreadComponent', () => {
  let component: SelectedforumthreadComponent;
  let fixture: ComponentFixture<SelectedforumthreadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedforumthreadComponent]
    });
    fixture = TestBed.createComponent(SelectedforumthreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
