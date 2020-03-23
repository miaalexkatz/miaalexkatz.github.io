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

## Further API details

```ts

interface ClassSchema {
    name: string;
    title: string;
    description: string;
    minimum?: number;
    maximum?: number;
}

interface AbstractWizardSchema {
    allowPublish: boolean;
    autoLoad: boolean;
    autoNext: boolean;
    type: 'image' | 'audio' | 'pose';
    input: string;
    inputSettings: any;
    classes: ClassSchema[];
}

interface WizardImageSchema extends AbstractWizardSchema {
    input: 'webcam' | 'file';
    inputSettings: Partial<WebcamInputSettings | FileInputSettings>;
    modelOptions: Partial<ModelOptions>;
}

const schema: WizardImageSchema = {
    /**
     * immediately load the necessary model and resources?
     */
    autoLoad: true,
    /**
     * should the wizard automatically move to the next class on release?
     */
    autoNext: true,
    /**
     * what type of model is it?
     */
    type: 'image',
    /**
     * what type of input do you want to use?
     */
    input: 'webcam',
    /**
     * what are the settings for the input you want to use?
     */
    inputSettings: {
        fps: 30,
        croppable: true
    },

    classes: [
        { name: 'yes', minimum: 8 },
        { name: 'no', minimum: 8 }
    ],

    /**
     * provide the user with UI to publish a model to a shareable link
     * 1) if the user publishes a model it will be stored in site's LocalStorage
     * 2) if published models are found in site's LocalStorage UI will be presented
     *    in future visits to allow use to reload the same model
     */
    allowPublish: true,

    modelOptions: {
        // version: 2,
        // checkpointUrl?: string;
        // alpha?: number;
        // trainingLayer?: string
    }
};



const wizard = new tm.Wizard(schema);
await wizard.load();
document.body.appendChild(wizard.buttonElement);
const inferenceCam = new tm.CroppableWebcam();
document.body.appendChild(inferenceCam);

```
