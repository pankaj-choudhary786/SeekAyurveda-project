import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
  smooth: true,
  lerp: 0.08,
  wheelMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

export default lenis;
