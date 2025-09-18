import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-primar-button',
  imports: [CommonModule],
  templateUrl: './primar-button.component.html',
  styleUrl: './primar-button.component.css'
})
export class PrimarButtonComponent {

  @Input() textoBotao1: string = '';
  @Input() disabled: boolean | null = false;

}
