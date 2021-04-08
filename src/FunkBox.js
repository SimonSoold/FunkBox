import * as Tone from "tone"
let setUpLoop = null

// setup new synthInstrument channel with sequencer
function setupInstrument({ channel, instrument, eventCb }) {
  instrumentChannels[channel].instrument = instrument
  instrumentChannels[channel].sequence = new Tone.Sequence(
    eventCb,
    instrumentChannels[channel].sequencePattern
  ).start(0)
}
// setup new sampler channel with sequencer
function setupSampler({ channel, eventCb }) {
  instrumentChannels[channel].instrument = new Tone.Sampler({
    urls: {
      24: "asHihat01.wav",
    },
    baseUrl: process.env.PUBLIC_URL + "/Drums/",
  }).toDestination()
  instrumentChannels[channel].sequence = new Tone.Sequence(
    eventCb,
    instrumentChannels[channel].sequencePattern
  ).start(0)
}
// setup
const setupLoop = () => {
  setupInstrument({
    channel: "KickChannel",
    instrument: new Tone.MembraneSynth().toDestination(),
    eventCb: seqMembrane,
  })
  setupInstrument({
    channel: "NoiseChannel",
    instrument: new Tone.NoiseSynth().toDestination(),
    eventCb: seqNoise,
  })
  setupInstrument({
    channel: "PolyChannel",
    instrument: new Tone.PolySynth().toDestination(),
    eventCb: seqPoly,
  })
  setupSampler({
    channel: "HihatChannel",
    eventCb: seqSampler,
  })
  instrumentChannels.PolyChannel.instrument.set({ detune: -1200 })
  canvas = document.querySelector("#Main-Screen")
  ctx = canvas.getContext("2d")
  ctx.moveTo(0, 0)
  canvasLoop = new Tone.Sequence(drawLoopCanvas, [
    [["C1"]],
    [["C1"]],
    [["C1"]],
    [["C1"]],
    [["C1"]],
    [["C1"]],
    [["C1"]],
    [["C1"]],
  ])
  canvasLoop.start(0)
  Tone.Transport.start()
  setUpLoop = true
}

// Pulse Animation
let canvas = null
let ctx = null
let canvasLoop = null
let counter = 0
function drawLoopCanvas() {
  Tone.Transport.schedule((time) => {
    Tone.Draw.schedule(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      ctx.arc(10 * counter, 5 * counter, 2 * counter, 0, 2 * Math.PI)
      ctx.stroke()
      counter > 30 ? (counter = 0) : counter++
      /*
      if (!ctx.circle) {
        ctx.arc(100 * counter, 50 * counter, 20 * counter, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.circle = "rect"
      } else if (ctx.circle === "rect") {
        ctx.rect(80 * counter, 30 * counter, 40, 40)
        //ctx.arcTo(75, 95, 40, 40, 2 * Math.PI)
        ctx.stroke()
        ctx.circle = null
      }
      counter > 32 ? (counter = 0) : counter++
      //do drawing or DOM manipulation here
      */
    }, time)
  }, "+0.05")
}

// Tone.Sequence callBack functions
function drawSequence(drawTarget, drawClass) {
  let channelLabel = document.querySelector(drawTarget)
  Tone.Transport.schedule((time) => {
    Tone.Draw.schedule(() => {
      channelLabel.classList.contains(drawClass)
        ? channelLabel.classList.add(drawClass + "-second")
        : channelLabel.classList.add(drawClass)
    }, time)
    Tone.Transport.schedule((time) => {
      Tone.Draw.schedule(() => {
        channelLabel.classList.remove(drawClass)
        channelLabel.classList.remove(drawClass + "-second")
      }, time)
    }, "+0.2")
  }, "+0.05")
}
function seqMembrane(time, note) {
  drawSequence(
    instrumentChannels.KickChannel.drawTarget,
    instrumentChannels.KickChannel.drawClass
  )
  instrumentChannels.KickChannel.instrument.triggerAttackRelease(
    note,
    "16n",
    time
  )
}
function seqNoise(time) {
  drawSequence(
    instrumentChannels.NoiseChannel.drawTarget,
    instrumentChannels.NoiseChannel.drawClass
  )
  instrumentChannels.NoiseChannel.instrument.triggerAttackRelease(time)
}
function seqPoly(time) {
  drawSequence(
    instrumentChannels.PolyChannel.drawTarget,
    instrumentChannels.NoiseChannel.drawClass
  )
  instrumentChannels.PolyChannel.instrument.triggerAttackRelease(
    ["C4", "E4", "G4", "B4"],
    "16n",
    time
  )
}
function seqSampler(time) {
  drawSequence(
    instrumentChannels.PolyChannel.drawTarget,
    instrumentChannels.NoiseChannel.drawClass
  )
  instrumentChannels.HihatChannel.instrument.triggerAttackRelease(
    [24],
    "16n",
    time
  )
}

// exports
const instrumentChannels = {
  KickChannel: {
    sequence: null,
    instrument: null,
    sequencePattern: [[], [], [], [], [], [], [], []],
    drawTarget: ".blink-Kick",
    drawClass: "seq-now",
  },
  NoiseChannel: {
    sequence: null,
    instrument: null,
    sequencePattern: [[], [], [], [], [], [], [], []],
    drawTarget: ".blink-Noise",
    drawClass: "seq-now",
  },
  PolyChannel: {
    sequence: null,
    instrument: null,
    sequencePattern: [[], [], [], [], [], [], [], []],
    drawTarget: ".blink-Poly",
    drawClass: "seq-now",
  },
  HihatChannel: {
    sequence: null,
    instrument: null,
    sequencePattern: [[], [], [], [], [], [], [], []],
    drawTarget: ".blink-Hihat",
    drawClass: "seq-now",
  },
}

//
export const changeInstrument = (channel, instrumentName) => {
  let eventCb = null
  let instrument = null

  if (instrumentName === "Sampler") {
    setupSampler({ channel, seqSampler })
  } else {
    switch (instrumentName) {
      case "Noise":
        eventCb = seqNoise
        instrument = new Tone.NoiseSynth().toDestination()
        break
      case "Membrane":
        eventCb = seqMembrane
        instrument = new Tone.MembraneSynth().toDestination()
        break
      case "Poly":
        instrument = new Tone.PolySynth().toDestination()
        break
      default:
        return null
    }
    setupInstrument({ channel, instrument, eventCb })
    return true
  }
}

export const changeStep = (step, name) => {
  if (setUpLoop) {
    let tempArr = instrumentChannels[name].sequence.events[step]
    switch (instrumentChannels[name].sequence.events[step].length) {
      case 0:
        tempArr = [["C1"]]
        break
      case 1:
        tempArr = [["C1"], ["C1"]]
        break
      case 2:
        instrumentChannels[name].sequence.events[step][0][0]
          ? (tempArr = [[], ["C1"]])
          : (tempArr = [["C1"], ["C1"], ["C1"]])
        break
      case 3:
        if (instrumentChannels[name].sequence.events[step][0][0]) {
          tempArr = [[], ["C1"], ["C1"]]
        } else if (instrumentChannels[name].sequence.events[step][1][0]) {
          tempArr = [[], [], ["C1"]]
        } else {
          tempArr = []
        }
        break
      default:
        tempArr = []
        break
    }
    instrumentChannels[name].sequence.events[step] = tempArr
  }

  // return till component => illustrera note, paus, triplet
}

export const toggleLoop = () => {
  let StartStop = document.querySelector(".start-button")
  setUpLoop ? Tone.Transport.toggle() : setupLoop()
  //changeInstrument("KickChannel", "Membrane")
  StartStop.innerHTML === "start"
    ? (StartStop.innerHTML = "stop")
    : (StartStop.innerHTML = "start")
}
export const stopLoop = () => {
  Tone.Transport.stop()
}
