import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database'; 
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  public fireAuth: any;
	userDetails = firebase.database().ref('/userProfile');

  constructor(public af: AngularFireAuth, 
     public afDb: AngularFireDatabase )
   {
		this.fireAuth = firebase.auth();
		console.log('Hello AuthServiceProvider Provider');
  }
  getUser(): firebase.User { 
    return this.af.auth.currentUser; 
  }
  
  anonymousLogin(): Promise<any> { 
    return this.af.auth.signInAnonymously(); 
  }

  doLogin(email: string, password: string): Promise<any> {
    return this.af.auth.signInWithEmailAndPassword(email,password);
    //return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  resetPassword(email: string): Promise<any> { 
    return this.af.auth.sendPasswordResetEmail(email);
   }
   logoutUser(): Promise<void> { 
     return this.af.auth.signOut();
     }

  registerUser(email: string, password: string, firstName: string, lastName:string):Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
     .then((newUser) => {this.userDetails.child(this.fireAuth.currentUser.uid).set({
		 email:email,
     firstName:firstName,
     lastName:lastName,
     userID:newUser.uid});
      // firebase.database().ref('userProfile').child(newUser.uid).set({email: email});
      },
      error => { console.error(error); } 
    );
  }
}
