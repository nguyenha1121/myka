import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DbLoading } from '../pages/dashboard/db-loading';
import { TradePage } from '../pages/trade/trade';
import { LoanPage } from '../pages/loan/loan';
import { FinalizePage } from '../pages/finalize/finalize';
import { SumPage } from '../pages/sum/sum';
import { DbHomePage } from '../pages/db-home/db-home';
import { LendingPage } from '../pages/db-home/sub-tabs/lending/lending';
import { NeedPage } from '../pages/db-home/sub-tabs/need/need';
import { TimeoutPage } from '../pages/db-home/sub-tabs/timeout/timeout';
import { SignUpPage } from '../pages/db-home/sub-tabs/sign-up/sign-up';
import { CamDoPage } from '../pages/cam-do/cam-do';
import { BocHoPage } from '../pages/boc-ho/boc-ho';
import { DetailPage } from '../pages/detail/detail';

import { GetJsonProvider } from '../providers/get-json/get-json';
import { HttpModule } from '@angular/http';
import { PostFormProvider } from '../providers/post-form/post-form';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage, DbLoading,
    TradePage,
    LoanPage,
    FinalizePage,
    SumPage,
    DetailPage,
    CamDoPage,
    BocHoPage,
    DbHomePage, LendingPage, NeedPage, TimeoutPage, SignUpPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    // CallNumber
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage, DbLoading,
    TradePage,
    LoanPage,
    FinalizePage,
    SumPage,
    DetailPage,
    CamDoPage,
    BocHoPage,
    DbHomePage, LendingPage, NeedPage, TimeoutPage, SignUpPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetJsonProvider,
    PostFormProvider,
    LoginProvider,
    CallNumber,
    SMS
  ]
})
export class AppModule {}
