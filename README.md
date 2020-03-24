# Hello Wizard

This is a *Teachablemachine.js* demo that shows how you can drop a “training wizard” on
top of your web creation with just a few lines of code. For example, you can
create a game or other experience where the user trains their own webcam-based
controller then uses it right away.


## Step 1: Create wizard via ImageWizard() 
The first step is to create a new `ImageWizard` object containing all the configurations
and callbacks. This object contains your `classes` array for your classes.

```js

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
  }
});
```

Then, append your wizard into the page to make it show up.

```js
document.body.appendChild(wizard.buttonElement);
```


## Step 2: Create camera via createInferenceCamera();
Then, create your camera for running inference.


```js
const inferenceCamera = wizard.createInferenceCamera();
document.body.appendChild(inferenceCamera);
```