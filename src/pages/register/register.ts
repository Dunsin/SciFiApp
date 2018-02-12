import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { LandingPage } from '../landing/landing';


@IonicPage({
  name: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public registerForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  firstNameChanged: boolean = false;
  lastNameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  


  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public formBuilder: FormBuilder, 
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
      
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.registerForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        firstName:['', Validators.compose([Validators.minLength(3), Validators.required])],
        lastName:['', Validators.compose([Validators.minLength(3), Validators.required])],
         });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  doRegister(){
    this.submitAttempt = true;

    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.firstname,this.registerForm.value.lastname).then( authService => {
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
  gotoLogin(): void { 
    this.navCtrl.push(LoginPage);
  }

}
