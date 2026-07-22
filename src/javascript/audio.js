import levelUpOgg from '../assets/sounds/level-up.ogg'

const levelUp = new Audio(levelUpOgg);
levelUp.volume = 0.25;

let muted = false;

export function toggleMute() {
  muted = !muted;
}

export function playLevelUp() {
  if (muted) return;

  levelUp.currentTime = 0;
  levelUp.play();
}

export function isMuted() {
  return muted;
}