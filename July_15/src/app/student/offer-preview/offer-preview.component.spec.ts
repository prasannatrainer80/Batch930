import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPreviewComponent } from './offer-preview.component';

describe('OfferPreviewComponent', () => {
  let component: OfferPreviewComponent;
  let fixture: ComponentFixture<OfferPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferPreviewComponent]
    });
    fixture = TestBed.createComponent(OfferPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
