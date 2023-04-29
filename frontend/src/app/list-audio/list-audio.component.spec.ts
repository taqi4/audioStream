import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAudioComponent } from './list-audio.component';

describe('ListAudioComponent', () => {
  let component: ListAudioComponent;
  let fixture: ComponentFixture<ListAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAudioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
