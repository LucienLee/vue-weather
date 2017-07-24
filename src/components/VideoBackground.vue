<template lang="pug">
.VideoBackground
  img.media(:src="image")
  video.media(autoplay, loop, muted)
    source(v-for="video in videos", :src="video", :type="getMediaType(video)")
  .filter(:style="filterStyle")
</template>

<script>
export default {
  props: {
    sources: {
      type: Array,
      required: true
    },
    backgroundPattern: {
      type: Object,
      default () {
        return {
          'background': `linear-gradient(135deg, #a9a9a9 25%,#000000 50%,#000000 50%,#a9a9a9 50%,#a9a9a9 75%,#000000 100%)`,
          'background-size': `8px 8px`
        }
      }
    },
    opacity: {
      type: Number,
      default: 0.08
    }
  },
  computed: {
    videos () {
      return this.sources.filter(source => /\.(mp4|webm|ogv)$/.test(source))
    },
    image () {
      return this.sources.filter(source => /\.(jpe?g|png|)$/.test(source))
    },
    filterStyle () {
      return {
        ...this.backgroundPattern,
        'opacity': this.opacity
      }
    }
  },
  methods: {
    getMediaType (source) {
      return source.replace(/\S+\.([^.]+)$/, (match, ext) => `video/${ext}`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../sass/mixins'

.VideoBackground
  position: fixed
  z-index: -1
  width: 100vw
  height: 100vh
  overflow: hidden

.media
  position: absolute
  height: 100%
  width: 16 / 9 * 100vh
  min-height: 9 / 16 *100vw
  min-width: 100%
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)

.filter
  +stretch
</style>

