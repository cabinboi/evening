/// background-color: #0a0a0a;   background-color: #ffffff;

var gFloaters; 
var gBeatEngine;
var gFile;

var gFolderBase;
var gAudExtension;
var gImageExtension;
var gFilePrefix;
var gCounter;
var gStartCounter;

var gVolume = 1;

//var gStarterAud;
 // gStarterAud =  new Audio(gFolderBase + "starter.ogg" ) ;   gStarterAud.play();////cover sound

function initialise(){    
  //setStageBlacks();    
  
  gFolderBase = "assets/";     
  gAudExtension = ".ogg";
  gImageExtension = ".png";
  gFilePrefix = "0";   
  gCounter = 0;
  
  gFile=new Xfile();         
    
  var audList = [];
  audList[0] = gFolderBase +  "01" + gAudExtension;         //"AUDIO/Brushs/29" +gAudExtension;      ///"01" + gAudExtension;  // bassy
  audList[1] = gFolderBase + "02" + gAudExtension;  // snarey
  audList[2] = gFolderBase +   "02" + gAudExtension;         //"AUDIO/Brushs/26" +gAudExtension;  // snarey  //
  audList[3] = gFolderBase + "02" + gAudExtension;  // snarey
                                // (bars/Sect, tSig, BPM, [4 aud srcs], millsecTimer--f/s )  shuffle loop=82 BPM
  gBeatEngine = new Beatengine([8, true], [4,4], 82, audList, 40); //// 96 was 60  
  gBeatEngine.action = 0; 
  gBeatEngine.startTime = new Date().getTime();
  gBeatEngine.beatTimeout = setTimeout(BeatEngineRollIt, gBeatEngine.millsecTimer);       
  
  initBella();
  
 // console.log(`in init, gVolume = ${gVolume}`); 
 
}   //CALLED FROM event-4 PART A      ----END INITIALISE



// Simulate click function
        function clickButton() {
          let ele = document.getElementById("Begin");
          console.log("in clicker " + ele);
            document.querySelector('#Begin').click();
        }



function audEnded(){
 // console.log("in audEnded");
  gBeatEngine.aud1ended = 1;    }



function playButt(){  
  if(gStartCounter){
   console.log(`yes gCounter`);
    gStartCounter = 0;
    document.getElementById("playText").innerHTML = ">";
    document.exitFullscreen();    ///********************
   // location.reload();
    resetBeatEngine();
    gwd.actions.timeline.gotoAndPlay('page1', 'pauseStart');  ////this pauses content where it is
  }else{
    console.log(`no gCounter`);
    gStartCounter = 1;
    document.getElementById("playText").innerHTML = "| |";  //"■";
    document.documentElement.requestFullscreen();   ///********************
    gwd.actions.timeline.gotoAndPlay('page1', 'Begin');
  }
  
  
  //  gwd.actions.timeline.gotoAndPause(objectId:String, labelName:String);
   // document.getElementById("playText").innerHTML = ">";
  
}
          
function fullscreen(){
  if(document.getElementById("Fscreen").innerHTML == "[  ]"){    ///GO FULLSCREEN    
    document.documentElement.requestFullscreen();
    document.getElementById("Fscreen").innerHTML = "[]";
  } else {                                                     /// GO SMALL
    document.exitFullscreen();
    document.getElementById("Fscreen").innerHTML = "[  ]";
  }   
}


function changeVolume(){
  var slider = document.getElementById("volSlider");
  setgVol(slider.value); 
 // console.log(`in changevol, gVolume = ${gVolume}`);
}
function setgVol(vol){gVolume = vol; document.getElementById("volSlider").value = vol; }



function initBella(){
   ////START THE GRID SWAP CLASS HERE - TO DO    
  ////////DIVS: Top 1-11, Right 1-10, Left 1-8, Bott 1-7, Door 1-6, Mid 1-6; 
  
  var topPath = "BELLA/TOP/";
  var topFileNums = 46;  ////pics in folder
  var topArr = [ ["Top1", topPath, topFileNums],  ["Top2",  topPath, topFileNums],  ["Top3",  topPath, topFileNums],  ["Top4",  topPath, topFileNums],  ["Top5",  topPath, topFileNums],  ["Top7",  topPath, topFileNums],  ["Top8",  topPath, topFileNums],  ["Top9",  topPath, topFileNums],  ["Top10",  topPath, topFileNums],  ["Top11",  topPath, topFileNums]  ];
  
  var leftPath = "BELLA/LEFT/";
  var leftFileNums = 32;  ////pics in folder
  var leftArr = [ ["Left2", leftPath, leftFileNums], ["Left4", leftPath, leftFileNums],  ["Left6", leftPath, leftFileNums], ["Left8", leftPath, leftFileNums] ];
  
  var bottPath = "BELLA/BOTT/";
  var bottFileNums = 24;  ////pics in folder
  var bottArr = [  ["Bott2", bottPath, bottFileNums],  ["Bott3", bottPath, bottFileNums],  ["Bott4", bottPath, bottFileNums],  ["Bott5", bottPath, bottFileNums],  ["Bott6", bottPath, bottFileNums],  ["Bott7", bottPath, bottFileNums]  ,  ["Bott8", bottPath, bottFileNums]   ]; 
                   
  var doorPath = "BELLA/Door/";
  var doorFileNums = 24;  ////pics in folder
  var doorArr = [ ["Door1", doorPath, doorFileNums], ["Door2", doorPath, doorFileNums], ["Door3", doorPath, doorFileNums], ["Door4", doorPath, doorFileNums], ["Door5", doorPath, doorFileNums], ["Door6", doorPath, doorFileNums] ];
    
  var midPath = "BELLA/MID/";
  var midFileNums = 24;  ////pics in folder
  var midArr = [ ["Mid1", midPath, midFileNums],  ["Mid2", midPath, midFileNums],  ["Mid3", midPath, midFileNums],  ["Mid4", midPath, midFileNums],  ["Mid5", midPath, midFileNums],  ["Mid6", midPath, midFileNums]   ];
  
  var rightPath = "BELLA/RIGHT/";
  var rightFileNums = 40;  ////pics in folder
  var rightArr = [ ["Right1", rightPath, rightFileNums],  ["Right2", rightPath, rightFileNums],   ["Right3", rightPath, rightFileNums],   ["Right4", rightPath, rightFileNums],   ["Right5", rightPath, rightFileNums],   ["Right6", rightPath, rightFileNums],   ["Right7", rightPath, rightFileNums],   ["Right8", rightPath, rightFileNums],   ["Right9", rightPath, rightFileNums],   ["Right10", rightPath, rightFileNums]   ];    

  var swapMatrix = topArr.concat(leftArr, bottArr, doorArr, midArr, rightArr);   
//  var ranSwapper = new Animator(swapMatrix, 20000, 0, "ranImageAud", [gFolderBase, 8], 0, 0,  [gFolderBase + "AUDIO/Brushs/", 52, gFolderBase + "AUDIO/RJguitar1/", 29] ); 
  var ranSwapper = new Animator(swapMatrix, 20000, 0, "ranImageAud", [gFolderBase, 8], 0, 0,  [gFolderBase + "AUDIO/Brushs/", 61, ] ); 
   gBeatEngine.animArray.push(ranSwapper); 
  
  document.getElementById("BELLA_NEW").style.opacity =  1;
  
  
  /*
  var canalArr =  [ ["smallCanal", "CANAL STARS/", 46] ]  ////CANAL VERSION   
  var canalSwapper = new Animator(canalArr, 20000, 0, "R", [gFolderBase]); 
  gBeatEngine.animArray.push(canalSwapper);
  */
  
 
}  //----------------------end initBella





function  ranImageAud(imagePathNum, elementArr, numMoves, audPathNum){      
                   // ["Image path", numFiles], image element to swap, num anim Moves, ["Aud path", numFiles]; 
                                ///elmntArr, numMovements, increments, whatMotion, files, sequence, callBack, audList, millsecs
      
  // element becomes elArray;  get a random element from that in Animator, send it to ranImageAudCB;
   let ranSwapper = new Animator(elementArr, numMoves, 0, "ranImageAud", imagePathNum, 0, 0, audPathNum );         
   gBeatEngine.animArray.push(ranSwapper);  
  
  }     //  called in init   ///NOT USED NOW
///-----------END  ranImageAud

function  ranImageAudCB(element, imgFolder, numFiles){  
   var returner = gFile.swapRandomImage( element, imgFolder, numFiles, gFilePrefix, gImageExtension);   
   
    if(gFile.getRandomNum(1000)<10){  ///start rotater     
       //[elmntArr, numMovements, increments, whatMotion, files, sequence, callBack, audList, millsecs ]// 10
       let transF = "rotateY(0deg)";
       document.getElementById(element).style.transform = transF; //init  put somewhere else for all
      
       let rotator = new Animator([[element]], 5, 36, "Y");  //         
       gBeatEngine.animArray.push(rotator);
      }  

  return returner;     
}   ///NOT USED NOW moved inside animator

///////////////////////// A PAIR WITH ranImageAud ^^^



    
function  frameLines(imagePathNum, element, numMoves){                        
      let ranSwapper = new Animator(element, numMoves, 0, "R", imagePathNum);         
      gBeatEngine.animArray.push(ranSwapper);      
    }

//// END Random Image + Aud




function BeatEngineRollIt(){     if(gBeatEngine){gBeatEngine.rollIt();}  }   // called for timeout 

function  resetBeatEngine(){  
 // console.log(`reset BE 1`);
  if(gBeatEngine){
    console.log(`reset BE 2`);
    
    gBeatEngine.loopAud.pause();
    gBeatEngine.loopAud.currentTime = 0;
    gBeatEngine.playingLoop = 0;
    
  gBeatEngine.action = 0;  
  gBeatEngine.playSound = 0;
  gBeatEngine = 0;   
  }                             } //called  FROM BEGIN BUTTON












///::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
////////////////// OLD BITS


//from here down mostly AUD specific

function setupDoorSigns(){
  //this triggers a sequence in Animator: doNothing, then Stutter, then flash
  
  //  ANOTHER LAYER TO ADD  HERE -- THE AUDIO    
  let open=new Animator("signholder", 16, 0, "S", [gFolderBase + gDoor.open[0], gDoor.open[1]], 0, [this.doorSigns], 0 ); // 4th
   //
  let urlBase=gFolderBase + gDoor.flash[0];
  let flash=new Animator("signholder", 5, 0, "S", [urlBase, gDoor.flash[1]], open, 0, [urlBase+"00"+gAudExtension], 0 ); // 3rd
      urlBase=gFolderBase + gDoor.stutter[0];
 //
  let stutter=new Animator("signholder", 20, 0, "R", [urlBase, gDoor.stutter[1]], flash, 0, [urlBase+"00"+gAudExtension], 0  );// 2nd
 //
  let doNothing=new Animator("signholder", 30, 0, 0, 0, stutter, 0, 0 ); // first  
  gBeatEngine.animArray.push( doNothing );  
}  //  called from animateDoorSigns()



function setSlideAnim(){
    
  gBeatEngine.animArray.push(new Animator("BLACK_TOP", 47, -3, "T"));  
  gBeatEngine.animArray.push(new Animator ("BLACK_BOTT", 44, 3, "T"));   
  gBeatEngine.animArray.push(new Animator ("SIDEcoverLEFT", 40, 3, "L"));  
  gBeatEngine.animArray.push(new Animator ("SIDEcoverRIGHT", 40, -3, "L"));    
  }  /// called from coverslide()


////////////////////////////////////  TIMELINE FUNCTIONS

function doSetup(){   initialise();   }  //CALLED FROM eVENT 10 gwd.setglobals  



function animateDoorSigns(){  setupDoorSigns() } /// called at INIT

function playfirstAudrey () {  gAudreyaud =  new Audio('9AUDREYS.mp3') ;   gAudreyaud.play(); }//called from tap area gwd.playfirstAudrey  

function coverslide(){  setSlideAnim();    } // CALLED from Event 11 gwd.MainMarker

function ProceedStop(){    gwd.actions.timeline.play('page1')  }/// called from onstage shape  gwd.ProceedStop

function WAITforclick() {    gwd.actions.timeline.pause('page1'); }//called from event 15 at Wait for Click gwd.WAITclick

function doortoLane(){   resetBeatEngine();  } ///CALLED FROM EVENT 8 near T4 end gwd.pauseclicks


// the black used #0a0a0a  body {  background-color: #0a0a0a;} rgb(10,10,10) ///WAS 255,255,255
///    add to html, body { in main CSS, shads inside GWD app
////gwd.actions.timeline.pause('page1');
//https://stackoverflow.com/questions/14834520/html5-audio-stop-function
//Audio.prototype.stop = function() {    this.pause();     this.currentTime = 0; };




function setStageBlacks() {         
   document.getElementById("SIDEcoverLEFT").style.left =  "-480px";      
   document.getElementById("SIDEcoverRIGHT").style.left =  "657px";       
  document.getElementById("BLACK_TOP").style.top =  "-228px";
  document.getElementById("BLACK_BOTT").style.top =  "524px";
}  //  called from Initialise()




///////////////////  WINDOW FADE SEQUENCE
//////////////////////////SUPERSEDED BY THE FLOATER CLASS

function callBack(obj){
  console.log("callback:: "+obj);   
}



// gridMoveFade(); 
function floatMe(element){    //FADE IN & MOVE  
  document.getElementById("FLOAT01").style.top =  "0px";
  document.getElementById("FLOAT01").style.left =  "0px";
  document.getElementById("FLOAT01").style.opacity =  0;
  gBeatEngine.animArray.push(new Animator("FLOAT01", 100, -1, "T")); 
  gBeatEngine.animArray.push(new Animator("FLOAT01", 100, 1, "L"));
  
  let stringFunction = "fadeOut";  
  let mover = new Animator("FLOAT01", 40, .02, "F",0, 0, [window[stringFunction]] );
  gBeatEngine.animArray.push(mover);    
}

function fadeOut(){  //FADE OUT  
 let stringFunction = "fadeWait";
 let mover = new Animator("FLOAT01", 52, -.02, "F",0, 0, [window[stringFunction]] );  
   gBeatEngine.animArray.push(mover);
}

function fadeWait(){  //RANDOM WAIT  
 let stringFunction = "floatMe";
  let stringElement = "26";
  let waitArray = [4,50,140,280,520,700,900,1500];
  let randNum = gFile.getRandomNum(waitArray.length);  
  let mover = new Animator("FLOAT01", waitArray[randNum], 0, "N",0, 0, [window[stringFunction](stringElement)] );
 gBeatEngine.animArray.push(mover);   
}


///////////////////  END WINDOW FADE SEQUENCE


function  beginOn(){  
  document.getElementById("Begin").style.opacity=1;
}


function  beginOff(){   document.getElementById("Begin").style.opacity=0; }




/////////////OLDER
  ///SHADS SPECIFIC
  /*
  let FLOAT01files = [gFolderBase + "FLOAT01/", 25];
  let topRange = [-20, 400];  //lowest num, & range for random  
  let elementArr = [["FLOAT01",topRange,0,100,-1,1, 40, .02, FLOAT01files,1], ["FLOAT03",0,0,100,1,0, 40, .03], ["FLOAT04",0,0,100,2,0, 40, .01]];    
  gFloaters = new AllFloaters(elementArr);  
  */
  ///END SHADS 
  
  ////Random Image + Aud -- the old door anim
  //gFile.swapImage("signholder", gFolderBase+ "PINK PORTO/"+"00.png");   
 
 // gFile.swapImage("BellaDoor5", gFolderBase+ "BELLA/Bella Door 5/"+"20.png"); 
//  ranImageAud([gFolderBase + "BELLA/Bella Door 5/", 24], "BellaDoor5", 20000, [gFolderBase + "AUDIO/Brushs/", 46]) ;
  ///24? OR 23?
 /////////////// gFile.swapImage("BellaDoor6", gFolderBase+ "BELLA/Bella Door/"+"16.png"); 
 // ranImageAud([gFolderBase + "BELLA/Bella Door 5/", 24], "BellaDoor6", 20000, [gFolderBase + "AUDIO/Brushs/", 46]) ;  
  
  /*
  THE GREY LINES - HAVE TAKEN THESE DIVS OUT OF WD STAGE:"LEFT2" ... TO "TOP3", NEED TO REPLACE IF USED
  frameLines([gFolderBase + "DOOR/FRAME lines/LEFT2/", 3], "LEFT2", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/LEFT3/", 3], "LEFT3", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/BOTTOM2/", 3], "BOTT2", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/BOTTOM3/", 3], "BOTT3", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/RIGHT2/", 3], "RIGHT2", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/RIGHT3/", 3], "RIGHT3", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/TOP2/", 3], "TOP2", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/TOP3/", 3], "TOP3", 20000);  
  */
  
 //  gFile.stopAudio (gStarterAud, 0);


// gFile.swapRandomImage( "OverWhite", gFolderBase + "DOOR/Over Whites/", 11, gFilePrefix, gImageExtension);



///FROM AUD

/*

function presentPage1(){  if( typeof gLane !== 'undefined' ){   gLane.visits++;   gwd.actions.timeline.gotoAndPause('page1', 'MAIN');}    }



function testParams(pageID){ 
  console.log("ID: "  + pageID);
  gwd.actions.gwdPagedeck.goToPage('pagedeck', pageID);   } //, 'slide', 1000, 'linear', 'top');   


*/

//called when page 1 ready to present  gwd.presentPage()



/*
  gLane = new Enviro(1);
  gDoor = new Enviro(0);
    gDoor.stutter=["DOOR/stutter/", 4]; 
    gDoor.flash=["DOOR/flash/", 5];  
    gDoor.signs=["DOOR/SIGNS/", 23];
    gDoor.brushes=["AUDIO/Brushs/", 46];    
    gDoor.open=["DOOR/opSign/", 16];
  gBella = new Enviro(0);
  gSky = new Enviro(0);
  gTunnel = new Enviro(0);  
  */

 // gBeatEngine.animArray.push(new Animator("FLOAT01", 52, -.02, "F" ));  
  // gBeatEngine.animArray.push(new Animator("FLOAT01", 50, .02, "F" ));
//   console.log("in init "+ document.getElementById("FLOAT01").style.opacity);
   
              //  files, sequence, callBack
 

  
  /*
   let open=new Animator("signholder", 16, 0, "S", [gFolderBase + gDoor.open[0], gDoor.open[1]], 0, [this.doorSigns], 0 ); // 4th
   //
  let urlBase=gFolderBase + gDoor.flash[0];
  let flash=new Animator("signholder", 5, 0, "S", [urlBase, gDoor.flash[1]], open, 0, [urlBase+"00"+gAudExtension], 0 ); // 3rd
  */

// console.log("in fade seq OPAC: " + document.getElementById("FLOAT01").style.opacity);
  //document.getElementById("FLOAT01").style.opacity =  "1";  
 // document.getElementById("FLOAT01").style.opacity =  param; 
 //  console.log("in fade seq OPAC: " + document.getElementById("FLOAT01").style.opacity);


  //  let greyLINEfiles = [gFolderBase + "greyLINE/", 5];
//  let elementArr = [["FLOAT01",topRange,0,100,-1,1, 40, .02, FLOAT01files,1], ["FLOAT03",0,0,100,1,0, 40, .03], ["FLOAT04",0,0,100,2,0, 40, .01], ["greyLINE",400,200,100,0,0, 40, .02, greyLINEfiles]];    
         // floatA [[element, top, left, numMoves, incT, incL, fadeTime, fadePoints]],[]]

 ///// https://stackoverflow.com/questions/19126432/rotate-a-div-using-javascript

//gBeatEngine.action = [gFile.swapRandomImage, "signholder", gFolderBase + signs[0], signs[1], gFilePrefix, gImageExtension ];
//  gBeatEngine.playSound = [gFolderBase + brushes[0], brushes[1], "0", ".ogg"]; 


