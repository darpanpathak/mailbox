import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMailComponent } from './read-mail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

describe('ReadMailComponent', () => {
  let component: ReadMailComponent;
  let fixture: ComponentFixture<ReadMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMailComponent],
      imports: [RouterTestingModule],
      providers: [LocalStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
