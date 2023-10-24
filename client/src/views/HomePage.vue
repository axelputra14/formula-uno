<script>
import NavBar from '../components/NavBar.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'

export default {
  name: 'HomePage',
  components: {
    NavBar,
    Splide,
    SplideSlide
  }
}
</script>

<template>
  <NavBar />
  <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
    <SplideSlide>
      <iframe
        width="1920"
        height="1080"
        src="https://www.youtube.com/embed/kMlSQ1QVHvY?autoplay=1&mute=1"
      >
      </iframe>
    </SplideSlide>
    <SplideSlide>
      <iframe
        width="1920"
        height="1080"
        src="https://www.youtube.com/embed/0lh1qfoRk88?autoplay=1&mute=1"
      ></iframe>
    </SplideSlide>
    <SplideSlide>
      <iframe
        width="1920"
        height="1080"
        src="https://www.youtube.com/embed/5ExQr0Ktaxo?autoplay=1&mute=1"
      ></iframe>
    </SplideSlide>
  </Splide>
</template>
