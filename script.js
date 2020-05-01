/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

const $ = document.querySelector.bind(document);


const predictionEl = $("#prediction");

const wizard = new tm.Wizard({
  introduction: {
    title: tm.html`Let's teach your computer to recognize if your hand is up or down.`,
    description: tm.html`Click "Start", You'll need to allow access to your webcam. Note that your images stay private to you and do not leave your computer.`
  },
  classes: [
    {
      name: "Yes",
      title: "“Yes” examples.",
      description:
        "Add examples of what you want to trigger your “yes” state. This can be anything you want, like holding up your hand or an object."
    },
    {
      name: "No",
      title: "“No” examples.",
      description:
        "Add examples of what you want to trigger your “no” state. For example, without your hand or object."
    }
  ],
  onLoad: () => {
    console.log("model has loaded");
  },
  onPrediction: predictions => {
    const images = document.querySelectorAll('#images img');
    images[0].classList.add('hidden');
    if (predictions[0].probability > predictions[1].probability) {
      images[1].classList.remove('hidden');
      images[2].classList.add('hidden');
    } else {
      images[1].classList.add('hidden');
      images[2].classList.remove('hidden');
    }
    //predictions.sort((a, b) => (a.probability > b.probability ? -1 : 1));
    //predictionEl.innerHTML = predictions[0].className;
  },
  onSampleAdded: added => {
    console.log(added);
  },
  onTrain: () => console.log("train begins"),
  onTrainComplete: () => {
    const inferenceCamera = wizard.createInferenceCamera({
      size: 270
    });
    document.body.appendChild(inferenceCamera);
  }
});

// document.body.appendChild(wizard.domElement);
//document.body.appendChild(wizard.buttonElement);

// console.log('@teachablemachine/api wizard: ' ,new tm.Wizard());
// console.log('yeae boi');
