<template lang="pug">
  video-background(:sources="getClipsPaths(files[32])")
</template>

<script>
import {files, getClipsPaths} from '@/utils/weatherClips'
import VideoBackground from '@/components/VideoBackground'

export default {
  name: 'weather',
  components: {
    VideoBackground
  },
  data () {
    return {
      files
    }
  },
  methods: {
    getClipsPaths
  }
}
</script>

<style lang="sass" scoped>

</style>
