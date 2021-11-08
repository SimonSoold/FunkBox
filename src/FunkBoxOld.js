import * as Tone from "tone"

class MembraneSynth extends Tone.MembraneSynth {
  constructor() {
    super()
    this.eventCb = this.seqMembrane
  }
  seqMembrane(time, note) {
    this.drawSequence()
    this.instrument.triggerAttackRelease(note, "16n", time)
  }
}

class NoiseSynth extends Tone.NoiseSynth {
  constructor() {
    super()
    this.eventCb = this.seqNoise
  }
  seqNoise(time) {
    this.drawSequence()
    this.instrument.triggerAttackRelease(time)
  }
}

class PolySynth extends Tone.PolySynth {
  constructor() {
    super()
    this.eventCb = this.seqPoly
    this.set({ detune: -1200 })
  }
  seqPoly(time) {
    this.drawSequence()
    this.instrument.triggerAttackRelease(["C4", "E4", "G4", "B4"], "16n", time)
  }
}

class Sampler extends Tone.Sampler {
  constructor(sampleUrls, sampleBaseUrl) {
    super({
      urls: sampleUrls,
      baseUrl: sampleBaseUrl ? sampleBaseUrl : process.env.PUBLIC_URL,
    })
    this.eventCb = this.seqSampler
  }
  seqSampler(time) {
    this.drawSequence()
    this.instrument.triggerAttackRelease([24], "16n", time)
  }
}

/*
class SampleRecorder {
  constructor(target) {
    this.drawTarget = document.querySelector(target)
    this.animation = this.drawTarget.getContext("2d")
    this.animation.moveTo(0, 0)
    this.startButton = document.querySelector(
      ".sample-recorder > .recorder-start-button"
    )
    this.stopButton = document.querySelector(
      ".sample-recorder > .recorder-stop-button"
    )
    this.mic = new Tone.UserMedia()
    this.micFFT = new Tone.FFT()
    this.meter = new Tone.Meter()
    this.mic.connect(this.micFFT)
    this.mic.connect(this.meter)
    this.startButton.addEventListener("click", () => this.open())
    this.stopButton.addEventListener("click", () => this.close())
  }
  open(time) {
    this.mic.open().then(() => {
      let interval = setInterval(() => {
        console.log(this.micFFT)
        console.log(this.meter.getValue())
        console.log(this.micFFT.getValue())
        console.log(this.drawTarget)
        console.log(this.animation)
      }, 100)
      setTimeout(
        () => {
          clearInterval(interval)
          this.close()
        },
        time ? time : 2000
      )
    })
  }
  close() {
    this.mic.close()
  }
}
*/
class canvasAnimation {
  constructor(target, eventCb) {
    this.drawTarget = document.querySelector(target)
    this.animation = this.drawTarget.getContext("2d")
    this.animation.moveTo(0, 0)
    this.eventCb = eventCb ? eventCb : this.seqCanvas
    this.counter = 0
    this.canvasLoop = new Sequence(
      "Main",
      this.eventCb,
      [
        [["C1"]],
        [["C1"]],
        [["C1"]],
        [["C1"]],
        [["C1"]],
        [["C1"]],
        [["C1"]],
        [["C1"]],
      ],
      this,
      target
    )
  }
  seqCanvas() {
    this.drawSequence()
    Tone.Transport.schedule((time) => {
      Tone.Draw.schedule(() => {
        this.instrument.animation.clearRect(
          0,
          0,
          this.instrument.drawTarget.width,
          this.instrument.drawTarget.height
        )
        this.instrument.animation.beginPath()
        this.instrument.animation.arc(
          10 * this.instrument.counter,
          5 * this.instrument.counter,
          2 * this.instrument.counter,
          0,
          2 * Math.PI
        )
        this.instrument.animation.stroke()
        this.instrument.counter > 30
          ? (this.instrument.counter = 0)
          : this.instrument.counter++
      }, time)
    }, "+0.05")
  }
}

class Sequence extends Tone.Sequence {
  static newSequence(eventCb, sequencePattern) {
    return new Sequence(eventCb, sequencePattern)
  }
  constructor(name, eventCb, sequencePattern, instrument, drawTarget) {
    super(eventCb, sequencePattern)
    this.instrument = instrument ? instrument : "No Sound"
    this.drawTarget = drawTarget ? drawTarget : ".blink-" + name
    this.drawClass = "seq-now"
    this.start(0)
  }
  drawSequence() {
    let channelLabel = document.querySelector(this.drawTarget)
    Tone.Transport.schedule((time) => {
      Tone.Draw.schedule(() => {
        channelLabel.classList.contains(this.drawClass)
          ? channelLabel.classList.add(this.drawClass + "-second")
          : channelLabel.classList.add(this.drawClass)
      }, time)
      Tone.Transport.schedule((time) => {
        Tone.Draw.schedule(() => {
          channelLabel.classList.remove(this.drawClass)
          channelLabel.classList.remove(this.drawClass + "-second")
        }, time)
      }, "+0.2")
    }, "+0.05")
  }
}

class instrumentChannel {
  constructor(instrument, name) {
    this.name = name ? name : ""
    this.instrument = this.setInstrument(instrument)
    this.sequencePattern = [[], [], [], [], [], [], [], []]
    this.sequence = new Sequence(
      this.name,
      this.instrument.eventCb,
      this.sequencePattern,
      this.instrument
    )
    this.drawTarget = ".blink-" + name
    this.drawClass = "seq-now"
  }
  setInstrument(instrument) {
    switch (instrument) {
      case "Membrane":
        return new MembraneSynth().toDestination()
      case "Noise":
        return new NoiseSynth().toDestination()
      case "Poly":
        return new PolySynth().toDestination()
      default:
        return new Sampler({
          24: "/Drums/asHihat01.wav",
        }).toDestination()
    }
  }
  getInstrument() {
    return this.instrument
  }
  getEventCb() {
    return this.eventCb
  }
  changeStep = (step) => {
    let tempArr = this.sequence.events[step]
    switch (this.sequence.events[step].length) {
      case 0:
        tempArr = [["C1"]]
        break
      case 1:
        tempArr = [["C1"], ["C1"]]
        break
      case 2:
        this.sequence.events[step][0][0]
          ? (tempArr = [[], ["C1"]])
          : (tempArr = [["C1"], ["C1"], ["C1"]])
        break
      case 3:
        if (this.sequence.events[step][0][0]) {
          tempArr = [[], ["C1"], ["C1"]]
        } else if (this.sequence.events[step][1][0]) {
          tempArr = [[], [], ["C1"]]
        } else {
          tempArr = []
        }
        break
      default:
        tempArr = []
        break
    }
    this.sequence.events[step] = tempArr
    // return till component => illustrera note, paus, triplet
  }
  /*
  initSequence() {
    this.sequence = new Tone.Sequence(this.eventCb, this.sequencePattern).start(
      0
    )
  }
  */
}

class mixerChannel {
  constructor(channelList) {
    this.mixerBus = {}
    this.setMixer(channelList)
    //this.sampleRecorder = new SampleRecorder("#Main-Screen")
    this.canvas = new canvasAnimation("#Main-Screen")
  }
  setChannel(name, type) {
    this.mixerBus[name + "Channel"] = new instrumentChannel(type, name)
  }
  setMixer(channelList) {
    for (let channel of channelList) {
      this.setChannel(channel.name, channel.type)
    }
  }
  changeStep(channel, step) {
    if (this.mixerBus[channel]) {
      this.mixerBus[channel].changeStep(step)
    } else {
      console.log("There is no channel named " + channel)
    }
  }
}

let isSetup = null

let mixer = {}

const channelList = [
  { name: "Kick", type: "Membrane" },
  { name: "Noise", type: "Noise" },
  { name: "Poly", type: "Poly" },
  { name: "Hihat", type: "Sampler" },
]

// setup
const Setup = () => {
  mixer = new mixerChannel(channelList)
  changeBpm(60)
  Tone.Transport.start()
  isSetup = true
}

// exports

export const changeStep = (step, name) => {
  if (isSetup) {
    mixer.changeStep(name, step)
  }
  // return till component => illustrera note, paus, triplet
}

export const toggleLoop = () => {
  let StartStop = document.querySelector(".start-span")
  isSetup ? Tone.Transport.toggle() : Setup()
  StartStop.innerHTML === "start"
    ? (StartStop.innerHTML = "stop")
    : (StartStop.innerHTML = "start")
}
export const stopLoop = () => {
  Tone.Transport.stop()
}

export const changeBpm = (change) => {
  Tone.Transport.bpm.value = change
  document
    .querySelector(".reglage-svg-Bpm")
    .setAttribute("transform", "rotate(" + (change - 60) * 2 + ")")
  document.querySelector(".reglage-p-Bpm").innerText =
    Math.ceil(Tone.Transport.bpm.value) + " bpm"
}
