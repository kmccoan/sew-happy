import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Post } from '../../domain/models';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: [ './post-management.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PostManagementComponent,
      multi: true
    }
  ]
})
export class PostManagementComponent implements ControlValueAccessor, OnInit {

  public titleControl = new FormControl(null, Validators.required);
  public authorControl = new FormControl(null, Validators.required);
  public imageControl = new FormControl(null, Validators.required);

  public postForm = new FormGroup({
    title: this.titleControl,
    author: this.authorControl,
    image: this.imageControl
  });

  constructor() {
  }

  public ngOnInit(): void {
    this.postForm.valueChanges.subscribe(postChanges => {
      this.onChange(postChanges);
    });
  }

  public onChange = (_: any) => {/*noop*/
  }
  public onTouched = () => {/*noop*/
  }

  public writeValue(post: Post) {
    if (post == null) {
      this.postForm.reset();
    } else {
      this.postForm.setValue({
        title: post.title,
        author: post.author,
        image: post.summary_image_url
      });
    }
  }

  public registerOnChange(fn) {
    this.onChange = fn;
  }

  public registerOnTouched(fn) {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.postForm.disable();
    } else {
      this.postForm.enable();
    }
  }
}
