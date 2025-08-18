const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

/* Get the wecam video into the <video class= "player"> */
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })//promise
    .then(localMediaStream => {
      console.log(localMediaStream);
    
//  DEPRECIATION : 
//       The following has been depreceated by major browsers as of Chrome and Firefox.
//       video.src = window.URL.createObjectURL(localMediaStream);
//       Please refer to these:
//       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      
      //video.src = window.URL.createObjectURL(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`Standalone laptop has a blocked access webcam, promise is rejected`, err);
    });
}
/*   
gets the photo pixels out of the canvas, mess w/them changing RBG colors 
then put the photo back into the canvas */

/*  taking a frame from the webcam video and paint it into the canvas on the screen: paintToCanvas() 640 480*/
function paintToCanvas() {
  const width = video.videoWidth; // video size
  const height = video.videoHeight;
  canvas.width = width; // size the canvas according to the video size
  canvas.height = height;
  /* take screen-shots/image every 16 or so miliseconds and put it into the canvas*/
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); // draw the put image starting at top left corner and ending at image size width & height 
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height); // take the photo pixels
    // mess with them
    // pixels = redEffect(pixels); adds a red effect to the photo
    pixels = rgbSplit(pixels); // adds a rbg split effect to the photo
    // ctx.globalAlpha = 0.8; // makes the photo blury
    // pixels = greenScreen(pixels); // adds a green screen effect to the photo
    // put them back
    ctx.putImageData(pixels, 0, 0); // put back the photo into the canvas
  }, 16);
}

/* to be used to take photo snaps from the canvas*/
function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');// data bit64 representation of the photo
  const link = document.createElement('a'); // create image link to put it into the 'strip'
  link.href = data;
  link.setAttribute('download', 'handsome');// downloads the phot into the computer hdd
  /* link.textContent = 'Download image'; */
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`; // renders string into HTML to display the image on the pag
  strip.insertBefore(link, strip.firstChild); // insert the html into the code via <div class="strip"></div>
}

/* The following functions are filters to manipulate the photo */
/* Applies the red effect to the photo via RBG changes*/
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();
// listening for a <video> event in the webcam to paint it into canvas
video.addEventListener('canplay', paintToCanvas); 
