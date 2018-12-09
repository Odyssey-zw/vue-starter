<template>
  <div class="recorder-js-demo">
    <h4>录音时间： {{duration}}秒</h4>
    <el-button size="small" @click="initMedia()">初始化</el-button>
    <!-- <el-button size="small" @click="destroyMedia()">结束</el-button> -->
    <el-button size="small" @click="startRecording()">开始录音</el-button>
    <el-button size="small" @click="stopRecording()">结束录音</el-button>
    <el-button size="small" @click="downloadMedia()">下载录音</el-button>

    <!-- <wave-stream :stream="streamData"></wave-stream> -->
    <!-- 音频图 -->
    <div class="wave-stream-demo">
      <svg ref="visualizer" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <mask ref="mask" id="mask"><g id="maskGroup"></g></mask>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#ff0a0a;stop-opacity:1" />
            <stop offset="20%" style="stop-color:#f1ff0a;stop-opacity:1" />
            <stop offset="90%" style="stop-color:#d923b9;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#050d61;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" mask="url(#mask)"></rect>
      </svg>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import Recorder from 'recorder-js'

export default {
  name: 'recorder-js-test',
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
      const that = this
      const audioContext = new (window.AudioContext || window.webkitAudioConetxt)()
      this.recorder = new Recorder(audioContext, {
        // An array of 255 Numbers
        // You can use this to visualize the audio stream
        // onAnalysed: data => console.log(data)
      })
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          this.stream = stream
          that.initWave(stream, audioContext) // 初始化音频波形图
          that.recorder.init(stream) // 初始化音频监听
        })
        .catch(err => console.log('呃, ...你的设备貌似没有...麦克风?', err))
    },

    // 关闭设备 TODO
    destroyMedia() {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          // https://developers.google.com/web/updates/2015/07/mediastream-deprecations?hl=en#stop-ended-and-active
          let track = stream.getTracks()[0] // if only one media track
          track.stop()
        })
        .catch(err => console.log('呃, ...你的设备貌似没有...麦克风?', err))

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
          let fd = new FormData()
          fd.append('audioData', blob)
          // 发送fd到后端 语音识别
          // buffer is an AudioBuffer
        })
      } catch (e) {
        Message.error({ message: '停止失败！' })
      }
    },

    // 录音下载
    downloadMedia() {
      Recorder.download(this.blob, 'my-audio-file') // downloads a .wav file
    },

    // 监听音频流
    initWave(stream, audioContext) {
      let visualizer = this.$refs.visualizer
      let mask = this.$refs.mask
      this.drawWave(stream, audioContext, visualizer, mask)
    },

    drawWave(stream, audioContext, visualizer, mask) {
      let audioContent = audioContext // new (window.AudioContext || window.webkitAudioConetxt)()
      let audioStream = audioContent.createMediaStreamSource(stream)
      let analyser = audioContent.createAnalyser()
      audioStream.connect(analyser)
      analyser.fftSize = 1024

      let frequencyArray = new Uint8Array(analyser.frequencyBinCount)
      visualizer.setAttribute('viewBox', '0 0 255 255')

      // Through the frequencyArray has a length longer than 255, there seems to be no
      // significant data after this point. Not worth visualizing.
      let path
      for (let i = 0; i < 255; i++) {
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('stroke-dasharray', '4,1')
        mask.appendChild(path)
      }
      let paths = document.getElementsByTagName('path')

      let doDraw = () => {
        requestAnimationFrame(doDraw)
        analyser.getByteFrequencyData(frequencyArray)
        let adjustedLength
        for (let i = 0; i < 255; i++) {
          adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5)
          paths[i].setAttribute('d', 'M ' + (i) + ',255 l 0,-' + adjustedLength)
        }
      }
      doDraw()
    }
  }
}
</script>

<style lang="less">
@import '../../common/css/theme.less';

.recorder-js-demo {
  // color: @base-color;

  .wave-stream-demo {
    padding: 0;
    margin: 0;
    width: 400px;
    height: 300px;
    background-color:#fff;
    font-size: 0;
    position: relative;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    position:absolute;
  }

  path {
    stroke-linecap: square;
    stroke: white;
    stroke-width: 0.5px;
  }
}
</style>
