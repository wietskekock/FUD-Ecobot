// More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/WIMU9ak4b/";

    let model, webcam, labelContainer, maxPredictions, outcomeTxt;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById("label-container");
        

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);
        
        document.getElementById("mat-message").style.display="";
        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);

        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    function response(){
        document.getElementById("other-message").style.display="";
        document.getElementById("opnieuw").style.display="";
        
    }
    
    //restarting the bot
    function reset(){
        document.getElementById("other-message").style.display="none";
        document.getElementById("opnieuw").style.display="none"; 

    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const predictions = await model.predict(webcam.canvas); console.table(predictions); 
        const sortedPredictions = predictions.sort((a, b) => (a.probability || 0) < (b.probability || 0));
        const maxPrediction = sortedPredictions[0];

        
        if(maxPrediction) {
            labelContainer.innerHTML = maxPrediction.className;
            labelContainer.style.display = "";
        }

        if (className = "Hout"){
            document.getElementById("hout-text").style.display="";
        } else if (className = "Steen"){
            document.getElementById("hout-text").style.display="";
        } else if ( className = "Staal"){
            document.getElementById("staal-text").style.display="";
        } else {
            document.getElementById("hout-text").style.display="";
        }
        
    
        
        setTimeout(function() {
            document.getElementById('webcam-container').style.display="none";}, 2000);
        
        
    }


    


