let Pat0, Pat1, Pat2, Pat3, Pat4;
let Phrase0, Phrase1, Phrase2, Phrase3, Phrase4;
let drums;
let bpmCTRL;
let beatLength;
let cellWidth;
let cnv, playPause;
let Pats;
let cursorPos;

let mic;
let recorder;

let state = [];
let sound = [];
let buttonRecord = [];
let playbackRate = [];
let slider = [];

function setup() {
  cnv = createCanvas(320, 110);
  cnv.position(230, 10);
  cnv.mousePressed(canvasPressed);

  beatLength = 16;
  cellWidth = cnv.width / beatLength;
  cursorPos = 0;

  //createCanvas(400, 400);
  mic = new p5.AudioIn();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  mic.start();

  for (let i = 0; i < 5; i++) {
    state[i] = 0;
    buttonRecord[i] = createButton("record");
    buttonRecord[i].position(5, i * 25 + 5);
    slider[i] = createSlider(0, 255, 100);
    slider[i].position(80, i * 25 + 5);
  }

  buttonRecord[0].mousePressed(() => {recordVoice(0);});
  slider[0].mouseReleased(() => {changeRate(0);});

  buttonRecord[1].mousePressed(() => {recordVoice(1);});
  slider[1].mouseReleased(() => {changeRate(1);});

  buttonRecord[2].mousePressed(() => {recordVoice(2);});
  slider[2].mouseReleased(() => {changeRate(2);});
  
  buttonRecord[3].mousePressed(() => {recordVoice(3);});
  slider[3].mouseReleased(() => {changeRate(3);});

  buttonRecord[4].mousePressed(() => {recordVoice(4);});
  slider[4].mouseReleased(() => {changeRate(4);});

  Pat0 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
  Pat1 = [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0];
  Pat2 = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0];
  Pat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
  Pat4 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  Pats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  Phrase0 = new p5.Phrase("sound[0]",
    (time) => {sound[0].play(time);},Pat0);
  Phrase1 = new p5.Phrase("sound[1]",
    (time) => {sound[1].play(time);},Pat1);
  Phrase2 = new p5.Phrase("sound[2]",
    (time) => {sound[2].play(time);},Pat2);
  Phrase3 = new p5.Phrase("sound[3]",
    (time) => {sound[3].play(time);},Pat3);
  Phrase4 = new p5.Phrase("sound[4]",
    (time) => {sound[4].play(time);},Pat4
  );

  playPause = createButton("play")
    .position(450, 140)
    //.style('background-color','white')
    .mouseClicked(() => {
      if (!drums.isPlaying) {
        // drums.metro.metroTicks = 0;
        drums.loop();
        playPause.html("pause");
      } else {
        drums.pause();
        playPause.html("play");
      }
    });

  drums = new p5.Part();

  drums.addPhrase(Phrase0);
  drums.addPhrase(Phrase1);
  drums.addPhrase(Phrase2);
  drums.addPhrase(Phrase3);
  drums.addPhrase(Phrase4);
  drums.addPhrase("seq", sequence, Pats);

  bpmCTRL = createSlider(30, 120, 80, 1);
  bpmCTRL.position(250, 140);
  bpmCTRL.input(() => {
    drums.setBPM(bpmCTRL.value());
  });
  drums.setBPM("80");

  drawMatrix();
}

function recordVoice(index) {
  state[index]++;
  state[index] %= 2;

  if (state[index] == 1) {
    sound[index] = new p5.SoundFile();
    recorder.record(sound[index]);
    buttonRecord[index].html("stop");
  } else {
    recorder.stop();
    buttonRecord[index].html("record");
  }
}

function changeRate(index) {
  playbackRate[index] = slider[index].value();
  playbackRate[index] = map(playbackRate[index], 0, 255, 0.01, 3);
  sound[index].rate(playbackRate[index]);
}

function canvasPressed() {
  let rowClicked = floor((5 * mouseY) / cnv.height);
  let indexClicked = floor((16 * mouseX) / cnv.width);
  if (rowClicked === 0) {
    console.log("first row " + indexClicked);
    Pat0[indexClicked] = +!Pat0[indexClicked];
  } else if (rowClicked === 1) {
    console.log("second row");
    Pat1[indexClicked] = +!Pat1[indexClicked];
  } else if (rowClicked === 2) {
    console.log("third row");
    Pat2[indexClicked] = +!Pat2[indexClicked];
  } else if (rowClicked === 3) {
    console.log("third row");
    Pat3[indexClicked] = +!Pat3[indexClicked];
  } else if (rowClicked === 4) {
    console.log("third row");
    Pat4[indexClicked] = +!Pat4[indexClicked];
  }

  drawMatrix();
}

const drawMatrix = () => {
  background(80);
  stroke("gray");
  strokeWeight(2);
  fill("white");
  for (let i = 0; i < beatLength + 1; i++) {
    //startx, starty, endx, endy
    line(i * cellWidth, 0, i * cellWidth, cnv.height);
  }
  for (let i = 0; i < 6; i++) {
    line(0, (i * cnv.height) / 5, cnv.width, (i * cnv.height) / 5);
  }
  noStroke();
  for (let i = 0; i < beatLength; i++) {
    if (Pat0[i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, cnv.height / 10, 10);
    }
    if (Pat1[i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, (cnv.height * 3) / 10, 10);
    }
    if (Pat2[i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, cnv.height / 2, 10);
    }
    if (Pat3[i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, (cnv.height * 7) / 10, 10);
    }
    if (Pat4[i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, (cnv.height * 9) / 10, 10);
    }
  }
};

const sequence = (time, beatIndex) => {
  // console.log(beatIndex);
  setTimeout(() => {
    drawMatrix();
    drawPlayhead(beatIndex);
  }, time * 1000);
};

const drawPlayhead = (beatIndex) => {
  stroke("red");
  fill(255, 0, 0, 30);
  rect((beatIndex - 1) * cellWidth, 0, cellWidth, cnv.height);
};

const touchStarted = () => {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
};
