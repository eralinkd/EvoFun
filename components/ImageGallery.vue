<template>
  <div class="gallery-section">
    <h2 class="gallery-title">Image Gallery</h2>
    <p class="gallery-subtitle">Explore our collection of images.</p>
    
    <div class="main-swiper-container">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="30"
        :pagination="{ clickable: true }"
        :thumbs="{ swiper: thumbsSwiper }"
        class="main-swiper"
      >
        <swiper-slide v-for="(image, index) in images" :key="`main-${index}`">
          <div class="main-slide">
            <img :src="image.src" :alt="image.alt" />
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="thumbs-container">
      <swiper
        :modules="modules"
        :slides-per-view="'auto'"
        :space-between="10"
        :watch-slides-progress="true"
        :centered-slides="true"
        @swiper="setThumbsSwiper"
        class="thumbs-swiper"
      >
        <swiper-slide v-for="(image, index) in images" :key="`thumb-${index}`" class="thumb-slide">
          <img :src="image.src" :alt="image.alt" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const modules = [Navigation, Pagination, Thumbs];

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const images = ref([
  { src: '/images/1.jpg', alt: 'Game 1' },
  { src: '/images/2.jpg', alt: 'Game 2' },
  { src: '/images/3.jpg', alt: 'Game 3' },
  { src: '/images/4.jpg', alt: 'Game 4' },
  { src: '/images/5.jpg', alt: 'Game 5' },
  { src: '/images/6.jpg', alt: 'Game 6' },
  { src: '/images/7.jpg', alt: 'Game 7' },
  { src: '/images/8.jpg', alt: 'Game 8' },
  { src: '/images/9.jpg', alt: 'Game 9' },
  { src: '/images/10.jpg', alt: 'Game 10' },
]);
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

.gallery-section {
  padding: 60px 20px;
  max-width: $container-max-width;
  margin: 0 auto;
}

.gallery-title {
  font-size: 2.5rem;
  color: $light-text;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 700;
}

.gallery-subtitle {
  font-size: 1.1rem;
  color: rgba($light-text, 0.7);
  text-align: center;
  margin-bottom: 40px;
}

.main-swiper-container {
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.main-swiper {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

:deep(.main-swiper .swiper-pagination-bullet) {
  background: $light-text;
  opacity: 0.5;
}

:deep(.main-swiper .swiper-pagination-bullet-active) {
  background: $primary-color;
  opacity: 1;
}

.main-slide {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: $dark-background;
  }
}

.thumbs-container {
  max-width: 800px;
  margin: 0 auto;
}

.thumbs-swiper {
  height: 80px;
  padding: 0 50px;
}

:deep(.thumbs-swiper .swiper-slide) {
  width: 100px;
  height: 70px;
  border-radius: 5px;
  overflow: hidden;
  opacity: 0.6;
  transition: opacity $transition-speed $transition-ease,
              border $transition-speed $transition-ease;
  cursor: pointer;
  border: 2px solid transparent;
}

:deep(.thumbs-swiper .swiper-slide-thumb-active) {
  opacity: 1;
  border: 2px solid $primary-color;
}

.thumb-slide {
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (max-width: $tablet) {
  .main-swiper-container {
    max-width: 720px;
  }
  
  .thumbs-container {
    max-width: 600px;
  }
}

@media (max-width: $mobile) {
  .main-swiper-container {
    max-width: 100%;
  }
  
  .thumbs-container {
    max-width: 100%;
  }
  
  .gallery-title {
    font-size: 2rem;
  }
  
  .thumbs-swiper {
    height: 70px;
    padding: 0 20px;
  }
  
  :deep(.thumbs-swiper .swiper-slide) {
    width: 80px;
    height: 60px;
  }
}
</style> 