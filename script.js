/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

const $ = document.querySelector.bind(document);

const predictionEl = $("#prediction");

const wizard = new tm.Wizard({
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
    predictions.sort((a, b) => (a.probability > b.probability ? -1 : 1));
    predictionEl.innerHTML = predictions[0].className;
  },
  onSampleAdded: added => {
    console.log(added);
  },
  onTrain: () => console.log("train begins"),
  onTrainComplete: () => {
    console.log("train complete");
    $("#intro-copy").classList.add("hidden");
    $("#confirmation-copy").classList.remove("hidden");
    const inferenceCamera = wizard.createInferenceCamera();
    document.body.appendChild(inferenceCamera);
  }
});

// document.body.appendChild(wizard.domElement);
document.body.appendChild(wizard.buttonElement);

// console.log('@teachablemachine/api wizard: ' ,new tm.Wizard());
// console.log('yeae boi');
