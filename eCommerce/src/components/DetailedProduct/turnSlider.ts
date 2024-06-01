export const turnSlides = (imagesUrls: string[], direction: 'left' | 'right', currentImg = 0) => {
  const sliderImages = document.querySelector('#sliderImages') as HTMLElement;
  const firstImg = sliderImages.querySelector('img') as HTMLImageElement;
  const imageCount = imagesUrls.length - 1;

  if (direction === 'left') {
    currentImg = currentImg == 0 ? -imageCount : currentImg + 1;
    firstImg.style.marginLeft = `${currentImg * 280}px`;
  } else {
    currentImg = currentImg == -imageCount ? 0 : currentImg - 1;
    firstImg.style.marginLeft = `${currentImg * 280}px`;
  }

  const indicates = document.querySelectorAll('li');
  for (let i = 0; i < indicates.length; i++) {
    indicates[i].classList.remove('active');
  }
  indicates[-currentImg].classList.add('active');

  return currentImg;
};
