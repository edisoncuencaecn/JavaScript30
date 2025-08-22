//Count timer to count seconds left in any task or break
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]'); // [] means all with date-time 

let countdown; // variable to hold setImterval so we can stop the timer
function timer(seconds){
   clearInterval(countdown); // clear any existing timers
   const now = Date.now(); // new way to get timestamp in miliseconds
   const then = now + seconds * 1000; // new time miliseconds
   displayTimeleft(seconds);
   displayEndTime(then);
   countdown = setInterval(() => {
     const secondsLeft = Math.round((then - Date.now()) / 1000); // use Date.now() for latest time
     if (seconds <= 0){
        clearInterval(countdown);
        return;
     }
     //display it
     displayTimeleft(secondsLeft);
    }, 1000);
}
// setInterval does not run immidiatelly but after 1 sec, therefore the following function
function displayTimeleft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display; // 'textContent' get or set the textual content of a specified node
}

// function to control the time to return or time to finish
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  // 'textContent' get or set the textual content of a specified node
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);  // data-time="20", dataset property allows you to access these attributes without the data- prefix
    timer(seconds);
}
     
// html custom elements attributes 'name' 
buttons.forEach(button => button.addEventListener('click',startTimer))
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault(); // to stop reloading the page
  const mins = this.minutes.value; // get the value of the form <input>
  console.log(mins);
  timer(mins * 60);
  this.reset(); // clear the previous input value
});

