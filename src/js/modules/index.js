import gsap from 'gsap';

export const gsapAnimations = () => {
  gsap.from('main', { opacity: 0, duration: 1, delay: 1, x: -50 });
};
