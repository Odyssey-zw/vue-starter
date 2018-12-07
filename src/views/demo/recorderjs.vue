<template>
  <div class="recorder-js-test">
    <h4>录音时间： {{duration}}秒</h4>
    <el-button size="small" @click="initMedia()">初始化</el-button>
    <el-button size="small" @click="destroyMedia()">结束</el-button>
    <el-button size="small" @click="startRecording()">开始录音</el-button>
    <el-button size="small" @click="stopRecording()">结束录音</el-button>
    <el-button size="small" @click="downloadMedia()">下载录音</el-button>

    <wave-stream :stream="streamData"></wave-stream>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import Recorder from 'recorder-js'

import WaveStream from './wave-stream'

export default {
  name: 'recorder-js-test',
  components: { WaveStream },
  data() {
    return {
      streamData: null,
      recorder: null,
      isRecording: false,
      duration: 0,
      blob: null
    }
  },

  mounted() {
  },

  methods: {
    // 初始化
    initMedia() {
      const audioContext = new (window.AudioContext || window.webkitAudioConetxt)()
      this.recorder = new Recorder(audioContext, {
        // An array of 255 Numbers
        // You can use this to visualize the audio stream
        // If you use react, check out react-wave-stream
        // onAnalysed: data => console.log(data)
      })

      const that = this
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          this.stream = stream
          that.recorder.init(stream)
        })
        .catch(err => console.log('Uh oh... unable to get stream...', err))
    },

    // 关闭设备
    destroyMedia() {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          debugger
          let track = stream.getTracks()[0] // if only one media track
          track.stop()
        })
        .catch(err => console.log('Uh oh... unable to get stream...', err))

      this.recorder = null
    },

    // 开始录音
    startRecording() {
      if (this.isRecording) return
      const that = this
      this.recorder.start().then(() => {
        that.isRecording = true
      })
      let duration = 0
      this.duration = 0
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        duration++
        that.duration = duration
      }, 1000)
    },

    // 停止录音
    stopRecording() {
      const that = this
      clearInterval(this.timer)

      try {
        this.recorder.stop().then(({blob, buffer}) => {
          that.isRecording = false
          that.blob = blob
          // buffer is an AudioBuffer
        })
      } catch (e) {
        Message.error({ message: '停止失败！' })
      }
    },

    // 录音下载
    downloadMedia() {
      Recorder.download(this.blob, 'my-audio-file') // downloads a .wav file
    }
  }
}
</script>

<style lang="less">
@import '../../common/css/theme.less';

.test {
  color: @base-color;
}
</style>
