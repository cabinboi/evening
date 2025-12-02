


class Enviro { 
  visits = 0;  
  constructor(visits) {
  if (visits) {this.visits= visits;}
}    
  get visits() {    return this.visits;  } 
}

class Xfile {
  constructor() {  } 
  
  /////                          MOVE
  
   move(element, direction, distance=20) {
   var topOrLeft = (direction=="left" || direction=="right") ? "left" : "top";
   if (direction=="up" || direction=="left") { distance *= -1; }
   var elStyle = window.getComputedStyle(element);
   var value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
   element.style[topOrLeft] = (Number(value) + distance) + "px";
}  
  
  
   setTop (element, pixincs){  
     let elementLoc = document.getElementById(element).style.top;
     let newpix = String(parseFloat(elementLoc)+pixincs)+"px";
     document.getElementById(element).style.top = newpix;     }   
  
  
  
   setLeft (element, pixincs){  
   //  let elementLoc = document.getElementById(element).style.left;
        var el = document.getElementById(element);
        var elStyle = window.getComputedStyle(el);
        var leftVal = elStyle.getPropertyValue("left").replace("px", "");
        el.style.left = (Number(leftVal) + pixincs) + "px";          
   }   
  
  
  
  
    /////                          FADE
  
    setFade (element, pixincs){  
      
     var elStyle = window.getComputedStyle(element);
     var opVal = elStyle.getPropertyValue("opacity");
     element.style.opacity = (Number(opVal) + pixincs) ;
      
  //    console.log(`opacity ${element.style.opacity}`);
  //   let elementOpac = document.getElementById(element).style.opacity;
 //    let newpOpac = String(parseFloat(elementOpac)+pixincs);
   //  document.getElementById(element).style.opacity = newpOpac;    
    }  
  
  
  
  
  /////                          FILES  
  
  getRandomFile(folderPath, fileCount, filePrefix, fileExtension){      
    
  let randnum = Math.floor(Math.random() * fileCount);           
  if (randnum < 10){
    let randomFile = folderPath + filePrefix + String(parseInt(randnum)) + fileExtension;    
    return randomFile;
  } else {
    let randomFile = folderPath + String(parseInt(randnum)) + fileExtension;     
    return randomFile;
  }  }
    
  /////                          IMAGES  
  
  swapRandomImage(imageHolder, imagePath, imageCount, filePrefix, imageExtension ){   
    let randomImg = gFile.getRandomFile(imagePath, imageCount, filePrefix, imageExtension);    
    let oldImage = document.getElementById(imageHolder).nativeElement.src; 
    oldImage = oldImage.substring(oldImage.lastIndexOf('/') + 1);//the 2 URLs are different lengths
    let newImage = randomImg.substring(randomImg.lastIndexOf('/') + 1);       
    if (oldImage == newImage) {  return true;  } else{       
                              gFile.swapImage(imageHolder, randomImg);  }    ///new image so swap              
   }    
  
  swapImage(element, newImage){   document.getElementById(element).nativeElement.src = newImage;  }

  /////                          AUDIO  
  
  newAud(audfile, vol){
    let aud=new Audio(audfile);
    aud.volume = vol;
    return aud;
  }
  setVol (aud, vol) {   aud.volume = vol; }   // sets an audio obj
  stopAudio (audref, playbackPointer){audref.pause(); audref.currentTime = playbackPointer;}   

 /////                          NUMBERS  
  
  getRandomNum(topNum){  return Math.floor(Math.random() * topNum);    } // returns random num from 0 to topNum-1        
  
  isNumeric(num){  return !isNaN(num)}   
  
}




