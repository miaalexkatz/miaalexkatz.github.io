### Teachablemachine.js Demo #1:
# Hello Wizard

Let's say you want to bring machine learning into your web creation. For example,
maybe you've made a game and want to let users train their own webcam-based controller.
Normally, this would be a lot of code.

That's one really helpful way you can use our new *Teachablemachine.js* library. One of the things it lets
you do is drop a “training wizard” on top of your web creation with just a few lines of code.
It's one of the fastest ways to bring machine learning to your web creation.

Click _Show_ to try out the demo. You'll use your webcam in the "training wizard" to train two
classes "yes" and "no" with whatever you want - e.g. holding your hand or an object up/down.
Then click _Train_ and a machine learning model will be created locally in your browser
(your images stay private to you and are not sent to any server).


## Step 1: Create wizard for training.
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


## Step 2: Create camera for recognition.
Then, create your camera which will recognize what the user does via `createInferenceCamera`.


```js
const myCamera = myWizard.createInferenceCamera();
document.body.appendChild(inferenceCamera);
```

## Remix this project!

Of course, you can remix this project by just editing
`script.js` to do what you want – add classes, change labels, triggers, and so on.

(NOTE TO SELVES TO DO: let's add ideas for what developers could do)

## Check out components demo too

(NOTE TO SELVES - let's work on the other one)