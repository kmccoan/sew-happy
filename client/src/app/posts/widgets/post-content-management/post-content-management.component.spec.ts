import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostContentManagementComponent } from './post-content-management.component';

describe('PostContentManagementComponent', () => {
  let component: PostContentManagementComponent;
  let fixture: ComponentFixture<PostContentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostContentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostContentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
