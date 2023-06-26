import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumthreadComponent } from './forumthread.component';

describe('ForumthreadComponent', () => {
  let component: ForumthreadComponent;
  let fixture: ComponentFixture<ForumthreadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumthreadComponent]
    });
    fixture = TestBed.createComponent(ForumthreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
