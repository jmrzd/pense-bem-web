import confetti from 'canvas-confetti'

export function fireSmallBurst() {
  confetti({
    particleCount: 60,
    spread: 55,
    startVelocity: 35,
    origin: { y: 0.65 },
    colors: ['#ffc738', '#ff5a3c', '#1c8c74', '#17130f'],
  })
}

export function fireCelebration() {
  const colors = ['#ffc738', '#ff5a3c', '#1c8c74', '#3a5dae', '#17130f']
  const end = Date.now() + 1200

  ;(function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors })
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()

  confetti({ particleCount: 140, spread: 100, startVelocity: 45, origin: { y: 0.5 }, colors })
}
