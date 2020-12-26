import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { SelectModule } from '../select/select.module';
import { StControlModule } from '@stlmpp/control';
import { NumberModule } from '../../number/number.module';

@NgModule({
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  imports: [CommonModule, ButtonModule, IconModule, SelectModule, StControlModule, NumberModule],
})
export class PaginationModule {}
