import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PostContent } from '../../domain/models';

@Component({
  selector: 'app-post-content-management',
  templateUrl: './post-content-management.component.html',
  styleUrls: [ './post-content-management.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PostContentManagementComponent,
      multi: true
    }
  ]
})
export class PostContentManagementComponent implements ControlValueAccessor {

  public content: PostContent = null;

  constructor(private ref: ChangeDetectorRef) {
  }

  public onChange = (_: any) => {/*noop*/
  }
  public onTouched = () => {/*noop*/
  }

  public writeValue(content: PostContent) {
    this.content = content;

    this.ref.markForCheck();
  }

  public registerOnChange(fn) {
    this.onChange = fn;
  }

  public registerOnTouched(fn) {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
  }

  public onInputBlur(content: string, index: number) {
    this.content.parts[index].content = content;
    this.onChange(this.content);
  }

  public addContent() {
    this.content.parts = [ ...this.content.parts, { content: '' } ];
  }

  public removePart(index: number) {
    const postParts = [...this.content.parts];
    postParts.splice(index, 1);
    this.content.parts = postParts;
    this.onChange(this.content);
  }
}
