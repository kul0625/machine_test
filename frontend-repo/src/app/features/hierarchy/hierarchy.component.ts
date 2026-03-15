import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent {
  @Input() user: any;
  showChildren = false;
  toggleChildren() {
    this.showChildren = !this.showChildren;
  }
}