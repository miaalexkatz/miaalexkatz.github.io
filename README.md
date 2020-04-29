### teachablemachine.js Demo #1:
# Hello Wizard

Let's say you want to bring machine learning into your web creation. For example, maybe you've made a
game and want to let users train their own webcam-based controller, or a new musical instrument that
reacts to your hands. Normally, this would be a lot of code, but the teachablemachine.js library allows 
you to implement it quickly. 

For example, one of the things it lets you do is drop a “training wizard” on top of your web creation with
just a few lines of code. This wizard will walk your users through training their machine learning model.

Click Show to try out the demo. You'll use your webcam in the "training wizard" to train two classes "yes" 

## Step 1: Create wizard for training.
First, create your "training wizard" by making a new `ImageWizard` object. This is where you'll define
your classes, instructions for the user, and callbacks.

```js

const myWizard = new tm.Wizard({
  // Define your classes
  classes: [
    {
      name: "Hand Up",
      title: "Record "Hand Up” examples.",
      description:
        "Add examples of what you want to trigger your “Hand Up” state. This can be anything you want, like holding up your hand or an object."
    },
    {
      name: "Hand Down",
      title: "Record “Hand Down” examples.",
      description:
        "Add examples of what you want to trigger your “Hand Down” state. For example, without your hand or object."
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


## Step 2: Create camera for recognition.
Then, create your camera which will recognize what the user does via `createInferenceCamera`.


```js
const myCamera = myWizard.createInferenceCamera();
document.body.appendChild(inferenceCamera);
```

## Remix this project!

Of course, you can remix this project by just editing `script.js.` For example:
- *Change classes*: How many, names of classes, and so on.
- *Change what happens*: Change what happens when each class is recognized. Make it show something,
say something, or even connect it to something you're building – a game, etc.
