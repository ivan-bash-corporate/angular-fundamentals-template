import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconProp, IconName } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: string;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  get icon(): IconProp | null {
    return this.iconName ? ['fas', this.iconName as IconName] : null;
  }
}
