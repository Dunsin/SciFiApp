import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { LandingPage } from '../landing/landing';


@IonicPage(
  {
    name: 'login'
  }
)
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public navParams: NavParams, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(){
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password).then( authService => {
        this.navCtrl.setRoot(LandingPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
