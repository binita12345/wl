import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GooglePlus]
})
export class HomePage {

	isfbLoggedIn:boolean = false;
	users: any;
	displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  isGooleLoggedIn:boolean = false;

  constructor(public navCtrl: NavController, private fb: Facebook, private googlePlus: GooglePlus) {
  	fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isfbLoggedIn = true;
      } else {
        this.isfbLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }

  fblogin() {
	  this.fb.login(['public_profile', 'user_friends', 'email'])
	    .then(res => {
	      if(res.status === "connected") {
	        this.isfbLoggedIn = true;
	        this.getUserDetail(res.authResponse.userID);
	      } else {
	        this.isfbLoggedIn = false;
	      }
	    })
	    .catch(e => console.log('Error logging into Facebook', e));
	}

	fblogout() {
	  this.fb.logout()
	    .then( res => this.isfbLoggedIn = false)
	    .catch(e => console.log('Error logout from Facebook', e));
	}

	getUserDetail(userid) {
	  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
	    .then(res => {
	      console.log(res);
	      this.users = res;
	    })
	    .catch(e => {
	      console.log(e);
	    });
	}

	googlelogin() {
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isGooleLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  googlelogout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isGooleLoggedIn = false;
      })
      .catch(err => console.error(err));
  }

  signin(){
  	this.navCtrl.push("SearchPage");
  }

}
