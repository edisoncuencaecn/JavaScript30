/* Get elements from html div classes player */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build functions  */
/* play & pause are video propeties */
function togglePlay() { 
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
/* toggle buttom by click */
function updateButton(){ 
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;

};
/* to listen skip video by click*/
function skip (){ 
  video.currentTime += parseFloat(this.dataset.skip); /* converts to number */
};
/* to listen the ranges sliders change events */
function handleRangeUpdate(){ 
  video[this.name] = this.value;

};
/* to listen to a progress bar  to rewind or move forward video*/
function handleProgress(){ 
  const percent = (video.currentTime/video.duration) * 100;
  progressBar.style.flexbasis = `${percent}%`;
};
/* to lsten to a scrub/jump time rewind/forward by % */
function scrub(e){  
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};




/* Hook up the html element event listeners, where 'e' represents the event object in the function, which is automatically passed to 
the triggered function when a specific event is triggered such as 'click', 'keypress', 'mousemove', 
range sliders 'change' which contains valuable info(name or value) such as
'target html element', 'mouse coordinates', 'key pressed' by referring to them via 'this.' inside of the function. */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false; /* to manage click down on the progress bar when it's setup as true  */
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


