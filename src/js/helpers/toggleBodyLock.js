import { FLS } from '../libs/parallaxMouse';

const pageWrapper = document.querySelector('.wrapper');
const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth;
const lockPaddingElements = document.querySelectorAll('[data-lp]');
const body = document.body;

const toggleBodyLock = (isLock) => {
  FLS(`Попап ${isLock ? 'открыт' : 'закрыт'}`);
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth;

  setTimeout(
    () => {
      if (lockPaddingElements) {
        lockPaddingElements.forEach((element) => {
          element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
        });
      }

      body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
      body.classList.toggle('lock', isLock);
    },
    isLock ? 0 : 500
  );
};

export default toggleBodyLock;
