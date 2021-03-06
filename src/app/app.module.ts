import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';

import { ScrollableTabs } from '../include/scrollable-tabs';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DbLoading } from '../pages/dashboard/db-loading';
import { TradePage } from '../pages/trade/trade';
import { NewTradeModal } from '../pages/trade/new-trade/new-trade';
import { TradeModal } from '../pages/trade/modal-trade/modal-trade';
import { NewTradeModal2 } from '../pages/finalize/new-trade/new-trade';
import { TradeModal2 } from '../pages/finalize/modal-trade/modal-trade';
import { LoanPage } from '../pages/loan/loan';
import { StaffPage } from '../pages/staff/staff';
import { AddStaffPage } from '../pages/staff/add-staff/add-staff';
import { ListStaffPage } from '../pages/staff/list-staff/list-staff';
import { FinalizePage } from '../pages/finalize/finalize';
import { SumPage } from '../pages/sum/sum';
import { TatToanModal } from '../pages/sum/tat-toan/tattoan';
import { DbHomePage } from '../pages/db-home/db-home';
import { DbHomeLoading } from '../pages/db-home/db-loading';
import { LendingPage } from '../pages/db-home/sub-tabs/lending/lending';
import { DbModal } from '../pages/db-home/sub-tabs/db-modal/db-modal';
import { ThulaiModal } from '../pages/db-home/sub-tabs/thulai-modal/thulai-modal';
import { NeedPage } from '../pages/db-home/sub-tabs/need/need';
import { TimeoutPage } from '../pages/db-home/sub-tabs/timeout/timeout';
import { SignUpPage } from '../pages/db-home/sub-tabs/sign-up/sign-up';
import { CamDoPage } from '../pages/cam-do/cam-do';
import { BocHoPage } from '../pages/boc-ho/boc-ho';
import { DetailPage } from '../pages/detail/detail';
import { BranchPage } from '../pages/branch/branch';

import { GetJsonProvider } from '../providers/get-json/get-json';
import { HttpModule } from '@angular/http';
import { PostFormProvider } from '../providers/post-form/post-form';
// import { LoginProvider } from '../providers/login/login';
import { ServiceProvider } from '../providers/service/service';

@NgModule({
  declarations: [
    ScrollableTabs,
    MyApp,
    HomePage,
    BranchPage,
    StaffPage, AddStaffPage, ListStaffPage,
    LoginPage, ProfilePage,
    RegisterPage,
    DashboardPage, DbLoading,
    TradePage, NewTradeModal, TradeModal,
    LoanPage,
    FinalizePage, NewTradeModal2, TradeModal2,
    SumPage, TatToanModal,
    DetailPage,
    CamDoPage,
    BocHoPage,
    DbHomeLoading,
    DbHomePage, LendingPage, NeedPage, TimeoutPage, SignUpPage, DbModal, ThulaiModal
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
    BranchPage,
    StaffPage,
    LoginPage, ProfilePage,
    RegisterPage,
    DashboardPage, DbLoading,
    TradePage, NewTradeModal, TradeModal,
    LoanPage,
    FinalizePage, NewTradeModal2, TradeModal2,
    SumPage, TatToanModal,
    DetailPage,
    CamDoPage,
    BocHoPage,
    DbHomeLoading,
    DbHomePage, LendingPage, NeedPage, TimeoutPage, SignUpPage, DbModal, ThulaiModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    GetJsonProvider,
    PostFormProvider,
    // LoginProvider,
    CallNumber,
    SMS,
    FileChooser, Transfer, TransferObject, File, FileTransfer,
    ServiceProvider
  ]
})
export class AppModule {}
