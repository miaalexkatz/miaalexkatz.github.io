# Hello Wizard

Let's say you're trying to make a web creation that uses machine learning. For example,
maybe you're trying to make a game where you can train your own webcam-based controller.
Normally, this would be a lot of code.

But that's what this new *Teachablemachine.js* library is for. One of the things it lets
you do is drop a “training wizard” on top of your web creation with just a few lines of code.
It's one of the fastest ways to bring machine learning to your web creation.

Click `In the demo, you'll train two classes "yes" and "no" using whatever you want. For example,
"yes" could be when your hand is up, or holding an object. "No" could be when you're hand is not up,
or you don't have that object.

create a game or other experience where you train your own webcam-based
controller and use it right away.

And of course you can remix this project by just editing
`script.js` to do what you want – add classes, change labels, triggers, and so on.


## Step 1: Create training wizard.
First, create your "training wizard" by making a new `ImageWizard` object. This is where you'll define
your classes, instructions for the user, and callbacks.

```js

const myWizard = new tm.Wizard({
  // Define your classes
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
document.body.appendChild(myWizard.buttonElement);
```


## Step 2: Create camera.
Then, create your camera which will recognize what the user does via `createInferenceCamera`.


```js
const myCamera = myWizard.createInferenceCamera();
document.body.appendChild(inferenceCamera);
```