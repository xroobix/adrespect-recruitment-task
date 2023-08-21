import anime from 'animejs/lib/anime.es.js';
import macy from 'macy';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import Swiper from 'swiper';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';

//                    SLIDER SECTION                   //
const swiper = new Swiper('.swiper-slider', {
  modules: [Navigation, Autoplay],
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
  },
});

//                    GALLERY SECTION                   //
const macyInstance = macy({
  container: '#gallery',
  trueOrder: true,
  waitForImages: false,
  margin: 43,
  columns: 3,
  breakAt: {
    968: 2,
    640: 1,
  },
});

const imagesToAdd = [
  {
    src: '10.jpg',
    w: 4096,
    h: 3072,
    class: 'h-[600px] object-center object-cover',
  },
  {
    src: '11.jpg',
    w: 4096,
    h: 2731,
    class: 'h-[600px] object-center object-cover',
  },
  {
    src: '12.jpg',
    w: 2651,
    h: 3536,
  },
  { src: '13.jpg', w: 3072, h: 4096 },
  {
    src: '14.jpg',
    w: 4096,
    h: 2731,
    class: 'h-[600px] object-center object-cover',
  },
  {
    src: '15.jpg',
    w: 2731,
    h: 4096,
    class: 'h-[600px] object-center object-cover',
  },
];

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery',
  children: 'a',
  pswpModule: PhotoSwipe,
});
lightbox.init();

const gallery = document.getElementById('gallery');
const galleryOverlay = document.getElementById('gallery-overlay');
const loadMore = document.getElementById('load-more');
const loadMoreButton = document.getElementById('load-more-btn');

const loadMoreImages = () => {
  loadMoreButton.removeEventListener('click', loadMoreImages);
  loadMore.remove();
  galleryOverlay.remove();
  imagesToAdd.forEach((image) => {
    const altFormSrc = 'image' + image.src.slice(0, -4);
    const link = document.createElement('a');
    const img = document.createElement('img');
    link.href = `/photos/${image.src}`;
    link.setAttribute('data-pswp-width', `${image.w}`);
    link.setAttribute('data-pswp-height', `${image.h}`);
    image?.class && img.setAttribute('class', `${image.class}`);
    img.src = `/photos/${image.src}`;
    img.alt = altFormSrc;
    link.appendChild(img);
    gallery.appendChild(link);
  });
  macyInstance.runOnImageLoad(function () {
    macyInstance.recalculate(true);
  }, true);
  lightbox.init();
};

loadMoreButton.addEventListener('click', loadMoreImages);

//                    NAV DROPDOWN SECTION                   //
const dropdownButton = document.getElementById('dropdown-button');
const dropdownMenu = document.getElementById('dropdown-menu');

let isOpen = false;

dropdownButton.addEventListener('click', () => {
  if (isOpen) {
    anime({
      targets: dropdownMenu,
      scaleY: 0,
      opacity: 0,
      duration: 300,
      easing: 'easeOutExpo',
      complete: () => {
        dropdownMenu.classList.add('hidden');
      },
    });
  } else {
    dropdownMenu.classList.remove('hidden');
    anime({
      targets: dropdownMenu,
      scaleY: 1,
      opacity: 1,
      duration: 300,
      easing: 'easeOutExpo',
    });
  }
  isOpen = !isOpen;
});
document.addEventListener('click', function (event) {
  if (
    !dropdownButton.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    if (isOpen) {
      anime({
        targets: dropdownMenu,
        scaleY: 0,
        opacity: 0,
        duration: 300,
        easing: 'easeOutExpo',
        complete: () => {
          dropdownMenu.classList.add('hidden');
        },
      });
      isOpen = false;
    }
  }
});

//                    MOBILE NAVBAR SECTION                   //
const mobileBtn = document.getElementById('mobile-btn');
const navigation = document.getElementById('navigation');

mobileBtn.addEventListener('click', () => {
  navigation.classList.remove('max-md:hidden');
  navigation.classList.add('max-md:block');
});

navigation.addEventListener('click', () => {
  navigation.classList.remove('max-md:block');
  navigation.classList.add('max-md:hidden');
});
