import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeoService } from './seo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, mapTo, merge, of } from 'rxjs';

//import { Plugins } from '@capacitor/core';
import { Network } from '@capacitor/network';

import { Clipboard } from '@capacitor/clipboard';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  appMode = false;
  updateAvil = false;
  enablePRO = false;

  env = {
    company:"Refr Tech", brand:"Refr", slogan: "slogan",
    companyLogo:"assets/company/logo_color_company.png", 
    brandLogo:"assets/brand/logo_color.png",
    brandOpenGraph:"https://firebasestorage.googleapis.com/v0/b/refr/o/opengraph.png?alt=media&token=87b5c5d3-f7a1-42d6-ab4e-65eb17deccf5",

    splash:"assets/hosted/splash.gif",
    splashDark:"assets/hosted/splashDark.gif",
    avatarB: "assets/other/avatarB.svg",
    avatarW: "assets/other/avatarW.svg",

    title:"REFR - Like, Share & Earn", 
    description:"REFR - Get Vocal for your favourite  Local businesses...Literally!! Discover & shop from online / offline stores on Refr, recommend them to your circle and get rewarded.Get genuine recommendations from friends and earn when you use them.This is Real Cash so.. Spend it across businesses or on the cool stuff listed on the app.Refr More. Earn More. Spend more",
    keywords:"refr, club",
    url:"https://biz.refr.club",

    db:{
      categories: "cats",
      inform: "inform",
      contacts: "contacts",
      payouts: "payouts",
      users: (!this.enablePRO ? "users" : "usersPRO"),
      shops: (!this.enablePRO ? "shops" : "shopsPRO"),
      hypes: (!this.enablePRO ? "hypes" : "hypesPRO"),
      things: (!this.enablePRO ? "things" : "thingsPRO"),
      codes: (!this.enablePRO ? "codes" : "codesPRO")
    },

    storeTyp: [ 
      {id:"Onli", name:"Online"}, 
      {id:"Offl", name:"Offline"}, 
      {id:"Both", name:"Online + Offline"}
    ],
  }
  storeTypeNow:string = "";

  foreignMarks:any = []
  categoryList:any = []
  merchandiseList:any[] = []
  campaignPlans:any = []
  vendorTaxes:any = null;

  currentNet = false;

  constructor(
    private snackBar: MatSnackBar,
    public router: Router,
    public seoService: SeoService,
    public dialog: MatDialog,
  ) { }


  get getHeight(){
    return window.innerHeight;
  }
  get getWidth(){
    return window.innerWidth;
  }
  

  actRoutes(){}


// VALIDATORS
invalidPhone(phone:string){
  const newNum  = new FormControl(phone, [
    Validators.pattern('^[0-9]+$')
  ]);
  return newNum.invalid;
}
invalidEmail(email:string){
  const newMail  = new FormControl(email, [
    Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
  ]);
  return newMail.invalid;
}
invalidPassword(pass:string){
  const newKey  = new FormControl(pass, [
    Validators.pattern('^[0-9A-Za-z@]+$')
  ]);
  return newKey.invalid;
}
first = new FormControl('', [
  Validators.required,
  Validators.pattern('^[A-Za-z0-9 ]+$'),
  Validators.minLength(2), Validators.maxLength(30)
]);


last = new FormControl('', [ // TO BE REMOVED
  Validators.required,
  Validators.pattern('^[A-Za-z0-9 ]+$'),
  Validators.minLength(2), Validators.maxLength(30)
]);

GST = new FormControl('', [
  Validators.required,
  Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'),
  Validators.minLength(15), Validators.maxLength(15)
]);

pass = new FormControl('', [
  Validators.required,
  Validators.pattern('^[0-9A-Za-z@]+$'),
  Validators.minLength(8), Validators.maxLength(14)
]);
/*
username = new FormControl('', [
  Validators.required,
  Validators.pattern('^[0-9a-z]+$'),
  Validators.minLength(3), Validators.maxLength(14)
]);
info = new FormControl('', [
  Validators.required,
  Validators.pattern(`^[0-9A-Za-z@|,;.:!?()'& ]+$`),
  Validators.minLength(3), Validators.maxLength(123)
]);
url = new FormControl('', [
  Validators.required,
  Validators.pattern('^[A-Za-z0-9./@]+$'),
  Validators.minLength(5), Validators.maxLength(39)
]);
profession = new FormControl('', [
  Validators.required,
  Validators.pattern('^[0-9A-Za-z ,.]+$'),
  Validators.minLength(3), Validators.maxLength(28)
]);
*/
// VALIDATORS



startSnackBar(mes:any){
  this.snackBar.open(mes, "", {
    duration: 2000, //panelClass:["b_accent","c_light"], 
    verticalPosition:"bottom", horizontalPosition:"right"
  });
}

copyClipboard(mes:string){
  if(this.appMode){
    const writeToClipboard = async () => {
      await Clipboard.write({
        string: mes
      });
    };

    writeToClipboard().then(() => {
      this.startSnackBar("copied to your clipboard.")
    })
  }else{
    navigator.clipboard.writeText(mes).then(() => {
      this.startSnackBar("copied to your clipboard.")
    });
  }
}

compareDates(date1:any){
  const dateX = Date.parse(date1);
  const date2 = Date.now();
  return dateX > date2;
}

// public onlineOffline(){
//   return merge(
//     of(navigator.onLine),
//     fromEvent(window, 'online').pipe(mapTo(true)),
//     fromEvent(window, 'offline').pipe(mapTo(false))
//    );
  /*
  // Network.addListener('networkStatusChange', status => {
  //   console.log('Network status changed', status);
  // });
  return of(
    this.internetConnected().then(res => {
      if(!res.connected){
        return false;
      }else{
        return true;

  // return merge(
  //   of(navigator.onLine),
  //   fromEvent(window, 'online').pipe(mapTo(true)),
  //   fromEvent(window, 'offline').pipe(mapTo(false))
  //  );

      }
    }).catch(() => {
      return false;
    })
  );
*/
  // return merge(
  //   of(navigator.onLine),
  //   fromEvent(window, 'online').pipe(mapTo(true)),
  //   fromEvent(window, 'offline').pipe(mapTo(false))
  //  );
   /*
   const { Network } = Plugins;
   
   let handler = Network.addListener('networkStatusChange', (status) => {
     console.log("Network status changed", status);
   });
   // To stop listening:
   // handler.remove();
   
   // Get the current network status
   let status = await Network.getStatus();
   
   // Example output:
   {
     "connected": true,
     "connectionType": "wifi"
   }
   */
//}

async internetConnected(){
  let x = false;
  try{
    const status = await Network.getStatus();
    console.log(status.connected, status.connectionType)
    x = status.connected;
    return of(status.connected);
  // try{
  //   const status = await Network.getStatus();
  //   return status.connected;
  }catch(error){
    //const status = await Network.getStatus();
    return false;
  }finally{
    this.currentNet = x;
    return x;
  }
}



}
