import { mapGetters } from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  watch: {
    playlist (newList) {
      this.handlePlaylist(newList)
    }
  },
  mounted () {
    this.handlePlaylist(this.playlist)
  },
  activated () {
    this.handlePlaylist(this.playlist)
  },
  methods: {
    handlePlaylist (playlist) {
      throw new Error('compoenent must implement handlePlaylist method')
    }
  }
}
