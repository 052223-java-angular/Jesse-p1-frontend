import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectplaylistComponent } from './selectplaylist.component';

describe('SelectplaylistComponent', () => {
  let component: SelectplaylistComponent;
  let fixture: ComponentFixture<SelectplaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectplaylistComponent]
    });
    fixture = TestBed.createComponent(SelectplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
