import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamsComponent } from './params.component';
import { StControlModule } from '@stlmpp/control';
import { SelectModule } from '../components/select/select.module';
import { FormModule } from '../components/form/form.module';
import { SpinnerModule } from '../components/spinner/spinner.module';
import { NgLetModule } from '../let/ng-let.module';
import { ObjectModule } from '../object/object.module';

@NgModule({
  declarations: [ParamsComponent],
  exports: [ParamsComponent],
  imports: [CommonModule, StControlModule, SelectModule, FormModule, SpinnerModule, NgLetModule, ObjectModule],
})
export class ParamsModule {}
