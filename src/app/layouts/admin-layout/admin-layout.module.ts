import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import { SettingsComponent } from 'src/app/admin/settings/settings.component';
import { CityService } from 'src/app/services/city.service';
import { SectorService } from 'src/app/services/sector.service';
import { CityComponent } from 'src/app/admin/settings/city/city.component';
import { SectorComponent } from 'src/app/admin/settings/sector/sector.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CityUpdateDialogComponent } from 'src/app/admin/settings/city/city-update-dialog/city-update-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { SectorUpdateDialogComponent } from 'src/app/admin/settings/sector/sector-update-dialog/sector-update-dialog.component';
import { ColorComponent } from 'src/app/admin/settings/color/color.component';
import { ColorUpdateDialogComponent } from 'src/app/admin/settings/color/color-update-dialog/color-update-dialog.component';
import { CarBrandComponent } from 'src/app/admin/settings/car-brand/car-brand.component';
import { CarBrandUpdateDialogComponent } from 'src/app/admin/settings/car-brand/car-brand-update-dialog/car-brand-update-dialog.component';
import { CarModelComponent } from 'src/app/admin/settings/car-model/car-model.component';
import { CarModelUpdateDialogComponent } from 'src/app/admin/settings/car-model/car-model-update-dialog/car-model-update-dialog.component';
import { ColorService } from 'src/app/services/color.service';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { PositionService } from 'src/app/services/position.service';
import { BrandModelService } from 'src/app/services/brand-model.service';
import { CarBrandLogoDialogComponent } from 'src/app/admin/settings/car-brand/car-brand-logo-dialog/car-brand-logo-dialog.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    SettingsComponent,
    CityComponent,
    CityUpdateDialogComponent,
    SectorComponent,
    SectorUpdateDialogComponent,
    ColorComponent,
    ColorUpdateDialogComponent,
    CarBrandComponent,
    CarBrandUpdateDialogComponent,
    CarBrandLogoDialogComponent,
    CarModelComponent,
    CarModelUpdateDialogComponent,
  ],
  providers: [
    CityService,
    SectorService,
    ColorService,
    CarBrandService,
    CarModelService,
    PositionService,
    BrandModelService,
    AuthGuardService,
    AuthService,
  ],
  entryComponents: [
    CityUpdateDialogComponent,
    ColorUpdateDialogComponent,
    CarBrandUpdateDialogComponent,
    CarModelUpdateDialogComponent,
    SectorUpdateDialogComponent,
    CarBrandLogoDialogComponent,
  ],
})
export class AdminLayoutModule {}
