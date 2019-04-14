import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-resource-not-found',
  template: `
    <p>
      This resource was not found.
    </p>
  `,
  styleUrls: ['./resource-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceNotFoundComponent {

  constructor() { }

}
