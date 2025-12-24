// Select elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play / Pause toggle
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Update play/pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update range sliders (volume & playback speed)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip forward/backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Scrub video when clicking progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

// Button events
toggle.addEventListener('click', togglePlay);

// Sliders
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

// Skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Progress bar scrubbing
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Error handling (bonus)
video.addEventListener('error', () => {
  console.error('Video failed to load');
});
