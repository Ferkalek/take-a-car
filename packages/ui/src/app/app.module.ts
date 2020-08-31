import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
// import { NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { CarsState } from "./state/cars.state";
import { environment } from "src/environments/environment";
import { LoaderComponent } from "./loader/loader.component";

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([CarsState], {
      developmentMode: !environment.production,
    }),
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
