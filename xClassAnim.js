
class Animator {  
  millsecTimer = 40; //ms = 25 frames/sec
  timeout = 0; 
  
  elementArr = [];
  element = 0;
  numMoves = 0;
  moveCounter = 0;
  pixincs = 0;  
  motion = 0; 
  
  fileArray=0;
  fileCounter=0;
  
  sequencer=0;
  callBack=0;
  
  audArray=0;  
  
  ranCounter=0; /// use for anything, then zero
            
  constructor(elmntArr, numMovements, increments, whatMotion, files, sequence, callBack, audList, millsecs  ) {
    if (elmntArr) {this.elementArr = elmntArr;}
    if (numMovements) {this.numMoves = numMovements;}
    if (increments) {this.pixincs = increments;}
    if (whatMotion) {this.motion = whatMotion;}
    if (files) {this.fileArray = files;  }
    if (sequence) {this.sequencer = sequence;   }
    if (callBack) {   this.callBack = callBack;   }   
    if (audList) {    this.audArray = audList;    }
    if (millsecs) {this.millsecTimer = millsecs;}      
}     
  
  anime(){        /////////   -- CHANGED in SHADS  ----ADD A CATCH FOR INFINITY, ONES MEANT TO KEEP SPINNING FOREVER
    if (this.moveCounter > this.numMoves) {
      // this anim has ended, but is there sequence to follow, or a callback?
      if(this.sequencer){gBeatEngine.animArray.push( this.sequencer );}
      if(this.callBack){   
       if(this.callBack[0]){
         let objToCall = this.callBack[0];   
         if(this.callBack[1]){
           let strMethod = this.callBack[1]; 
           objToCall[strMethod]();                
       }               }   }          
      return 1;      }  //end this.moveCounter > this.numMoves
    
    
    ///////////////////  GET THESE WORKING AS SWITCH
    switch (this.motion) {     
      case "ranImageAud":
                             ////this one has to go straight to Bengine because it has to sit on the beat timing
       gBeatEngine.playSound = [this.audArray[0], this.audArray[1],  gFilePrefix, gAudExtension, this.audArray[2], this.audArray[3] ]; ///put setter there 
       this.ranCounter = Math.floor(Math.random() * this.elementArr.length);      
       this.element = this.elementArr[this.ranCounter][0]; 
       gBeatEngine.action = [this.ranImageAudCB, this.element, this.fileArray[0]+this.elementArr[this.ranCounter][1],  this.elementArr[this.ranCounter][2], gFilePrefix, gImageExtension ];           
      this.ranCounter = 0; 
        break;
        
        
        case "left":  
        case "right":  
        case "up":  
        case "down":  
        this.element = this.elementArr[0][0];      
        var el = document.getElementById(this.element);
        gFile.move(el, this.motion, this.pixincs);         
        break;   
        
        
        case "fadeUpDown": 
        this.element = this.elementArr[0][0];      
        var el = document.getElementById(this.element);
        if(this.moveCounter <= this.numMoves/2){
           //console.log(`num < half  ${this.numMoves}`);
          gFile.setFade(el, this.pixincs);
        } else {
          // console.log(`num over half  ${this.numMoves}`);
          gFile.setFade(el, this.pixincs * -1);
        }
        break;
        
        default:
    }
    
    
    
  /*  if (this.motion == "ranImageAud"){
          ////this one has to go straight to Bengine because it has to sit on the beat timing
       gBeatEngine.playSound = [this.audArray[0], this.audArray[1],  gFilePrefix, gAudExtension, this.audArray[2], this.audArray[3] ]; ///put setter there
                           //ranImageAudCB IS IN xBase21           
       this.ranCounter = Math.floor(Math.random() * this.elementArr.length);      
       this.element = this.elementArr[this.ranCounter][0]; 
       gBeatEngine.action = [this.ranImageAudCB, this.element, this.fileArray[0]+this.elementArr[this.ranCounter][1],  this.elementArr[this.ranCounter][2], gFilePrefix, gImageExtension ];      
      
      this.ranCounter = 0;                                
    }  */  //THE OLD DOOR ANIM-- new in SHADS
    
    
    
    if (this.motion == "T"){gFile.setTop(this.element, this.pixincs); }    //MOVE V        
    
    if (this.motion == "L"){ 
      this.element = this.elementArr[0][0];            
      gFile.setLeft(this.element, this.pixincs);
  //    gFile.move(this.element, "left", this.pixincs)
    }    //MOVE H
          
    
    if (this.motion == "F"){ gFile.setFade(this.element, this.pixincs);}   ///FADE IN/OUT -- one way fader
    
    if (this.motion == "N"){ let p=0;       } //// DO NOTHING -- new in SHADS
    
    
    if (this.motion == "R"){         /////////////swap with a random file
      let ranSeeder = 40;    /// THIS RAN SEEDER NEEDS TO BE CARRIED THRU SOMEWHERE   
      if(gFile.getRandomNum(ranSeeder)<(ranSeeder/20)){                    
        //swapped this to get both to happen only if ran num ok --> look st this in AUD || both lines were outside    
        if(this.audArray){                  ////need a second aud array???
          if(gFile.getRandomNum(4)>2){
            let aud=gFile.newAud(this.audArray[0], 0.1); 
            aud.play();}
          }//audio simple yet
        
        /////have to deal with new array
         this.ranCounter = Math.floor(Math.random() * this.elementArr.length);      
        this.element = this.elementArr[this.ranCounter][0];
       // this.element = this.elementArr[0][0];                  
        gFile.swapRandomImage(this.element, this.fileArray[0]+this.elementArr[this.ranCounter][1], this.elementArr[this.ranCounter][2], gFilePrefix, gImageExtension);         
      }         
    }         
    
    if (this.motion == "S"){   //swap files in order 
      if(this.fileCounter > this.fileArray[1]-1){
        this.fileCounter=0;      } else{    
          if(this.audArray){if(gFile.getRandomNum(4)>2){let aud=gFile.newAud(this.audArray[0], 0.1); aud.play();}}//audio simple yet
          let fileStart=this.fileArray[0];
          if (this.fileCounter < 10){fileStart=fileStart + gFilePrefix;}         
          let newImage=fileStart + String(parseInt(this.fileCounter)) + gImageExtension;
          gFile.swapImage(this.element, newImage);
          this.fileCounter++;  }          }  
    
    if (this.motion == "Y"){       ////rotateY
      this.element = this.elementArr[0][0];
   
      //parse out the integers and add to this.pixincs  //  rotateY(0deg)      
      var oldStr = document.getElementById(this.element).style.transform;      
      var oldArr = oldStr.split("(");
      var oldArr2 = oldArr[1].split("d");
      var oldInt = parseInt(oldArr2[0]);
      var newInt = oldInt+this.pixincs;
      var newStr = String(newInt);
      var tranString = "rotateY(" + newStr + "deg)" ;           
      
     document.getElementById(this.element).style.transform = tranString;          
    }
    
    if (this.motion == "X"){   //////////////////rotateX    
      //parse out the integers and add to this.pixincs  //  rotateY(0de = g)      
     document.getElementById(this.element).style.transform = "rotateX(75deg)";          
    }
    
    
    
    this.moveCounter++;
    return 0;
  }   // END anime() 
  
       
  get timerClicks() {  return this.timerClicks;  } 
  
  
  
  ranImageAudCB(element, imgFolder, numFiles){      
  var returner = gFile.swapRandomImage( element, imgFolder, numFiles, gFilePrefix, gImageExtension);   
   
    
    if(gFile.getRandomNum(200)<10){  ///start rotater           
       let transF = "rotateY(0deg)";
       document.getElementById(element).style.transform = transF; //init  put somewhere else for all      
      var degrees;  
      if(gFile.getRandomNum(20)<10){ degrees = (-20);} else {degrees = 20;}      
       let rotator = new Animator([[element]], 9, degrees, "Y");  //         
       gBeatEngine.animArray.push(rotator);  }  ///---end rotator      
    
  
    if(gFile.getRandomNum(50)<10){  ///start mover                               
         var pixInc = 2;  //      make carry thru for these nums
         var directArr = ["left", "right", "up", "down"];
         var ranCounter = Math.floor(Math.random() * directArr.length);      
         var direction = directArr[ranCounter];                           
         let mover = new Animator([[element]], 4, pixInc, direction);  //      make carry thru for these nums   
         gBeatEngine.animArray.push(mover);  
      
       // if(gFile.getRandomNum(20)<10){  ///start fader
          var fadeInc = 0.1;
          let fader = new Animator([[element]], 12, fadeInc, "fadeUpDown");  
          gBeatEngine.animArray.push(fader); 
      //  }
    }  ///---end mover
          
        
        
  return returner;
  }  //-------end ranImageAudCB
    
  
}  //END Animator CLASS



