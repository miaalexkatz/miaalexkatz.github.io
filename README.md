# Hello Wizard

This example demonstrates a simple API for quickly getting a teachable image model
on to your experience. All you need to get started is to provide the `ImageWizard` with one object containing all
configurations and callbacks and create one camera for use on your predictions.

```js

const wizard = new tm.ImageWizard({
    inputSettings: {
        frameRate: 12,
        delaySeconds: 1,
        recordSeconds: 3
    },
    classes: [
        {
            name: 'washing',
            title: 'Wash your hands',
            description: 'Add examples of the faucet on, and record at least 3 seconds of you washing your hands.'
        },
        {
            name: 'idle',
            title: 'Idle',
            description: 'Add examples of your faucet off.'
        }
    ],
    onLoad: () => {
        console.log('model has loaded');
    },
    onPrediction: (predictions) => {
        predictions.sort((a, b) => a.probability > b.probability ? -1 : 1);
        if (predictions[0].className === 'washing') {
            console.log(`timedButton.ready: ${timedButton.ready}`);
            if (timedButton.ready) {
                timedButton.start();
            }
        } else {
            timedButton.cancel();
        }
    },
    onSampleAdded: (added) => {},
    onTrain: () => console.log('train begins'),
    onTrainComplete: () => console.log('train complete')
});
```

Lorem ipsum lorem ipsum ...

```js
const inferenceCamera = wizard.createInferenceCamera();

document.body.appendChild(wizard.buttonElement);
document.body.appendChild(inferenceCamera);

const timedButton = new TimedButtonElement();
timedButton.duration = 10 * 1000;
timedButton.fps = 15;
timedButton.labelGenerator = (ms, delay, duration) =>
    ms === 0 ?
    'Begin washing your hands' :
    Math.ceil((duration - ms) / 1000) + ' seconds remaining';

document.body.appendChild(timedButton);

```