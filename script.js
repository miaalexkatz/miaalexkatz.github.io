/* global tm */

const mainEl = document.querySelector('#container');

const wizard = new tm.Wizard({
  introduction: {
    title: tm.html`Let’s play some Peekaboo!.`,
    description: tm.html`Click "Start" and accept webcam permissions!.`
  },
  classes: [
    {
      name: "Where are you?",
      title: "“Record examples with your hands covering your face.",
      description:
        "Hold the button and take at least 20 pictures with your face covered by your hands. Stay in frame!"
    },
    {
      name: "Peekaboo!n",
      title: "Record examples with hands removed from your face",
      description:
        "Take at least 20 pictures with your hands removed. Stay in frame!"
    }
  ],
  onLoad: () => {
    console.log("model has loaded");
  },
  onPrediction: predictions => {
    const images = document.querySelectorAll('.prediction-image');
    let highestProb = Number.MIN_VALUE;
    let highestIndex = -1;
    predictions.forEach((pred, i) => {
      if (pred.probability > highestProb) {
        highestProb = pred.probability;
        highestIndex = i;
      }
    });
    images.forEach((img, i) => {
      if (i === highestIndex) {
        img.classList.remove('hidden');
      } else {
        img.classList.add('hidden');
      }
    });
  },
  onSampleAdded: added => {
    console.log(added);
  },
  onTrain: () => console.log("train begins"),
  onReady: () => {
    const inferenceCamera = wizard.createInferenceCamera({
      size: 270
    });
    const cameraContainer = document.querySelector('#inference-camera-container');
    cameraContainer.appendChild(inferenceCamera);
    mainEl.classList.add('ready');
  }
});

document.querySelector('#train-model-button').addEventListener('click', () => wizard.open());
