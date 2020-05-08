import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './app-shell/header/header.component';
import { LogoComponent } from './app-shell/logo/logo.component';
import { IssuesComponent } from './components/issues/issues.component';
import { IssuesStore } from './store/issues.store';
import { IssuesService } from './services/issues/issues.service';
import { UiStateStore } from './store/ui-state.store';
import { DebounceObsInputComponent } from './components/debounce-obs-input/debounce-obs-input.component';
import { CacheService } from './services/cache/cache.service';
import { LoginComponent } from './components/login/login.component';
import { CurrentUserStore } from './store/current-user.store';
import { CurrentUserService } from './services/current-user/current-user.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LogoComponent,
    IssuesComponent,
    DebounceObsInputComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSortModule,
    FlexLayoutModule,
  ],
  providers: [
    BrowserAnimationsModule,
    IssuesService,
    IssuesStore,
    UiStateStore,
    CacheService,
    CurrentUserStore,
    CurrentUserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
