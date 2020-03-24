# Hello Wizard

This is a *Teachablemachine.js* demo that shows how you can drop a “training wizard” on
top of your web creation with just a few lines of code. For example, you can
create a game or other experience where  trains their own webcam-based
controller then uses it right away.

We've made this demo incredibly simple, where you just train two classes ("yes" and "no")
using your webcam. But 


## Step 1: Create wizard.
First, create your "training wizard" by making a new `ImageWizard` object. This is where you'll define
your classes, instructions for the user, and callbacks.

```js

const wizard = new tm.Wizard({
  // Define your classes here
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
  // Callback for when the "inference camera" is running
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
  }
});
```

Then, append your wizard into the page to make it show up.

```js
document.body.appendChild(wizard.buttonElement);
```


## Step 2: Create camera.
Then, create your "inference camera" for running inference via `createInferenceCamera`.


```js
const inferenceCamera = wizard.createInferenceCamera();
document.body.appendChild(inferenceCamera);
```