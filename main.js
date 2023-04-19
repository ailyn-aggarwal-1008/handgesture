//https://teachablemachine.withgoogle.com/models/59R2NpVn8/

prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){

    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_img"  src=" '+data_uri+' ">';

    });
}
console.log('ml5 version: ', ml5.version );

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nTDhNXfId/model.json', modelloaded);

function modelloaded(){
    console.log('model Loaded');

}


function speak(){
    var synth=window.speechSynthesis; 
    data_1="The first prediction is " + prediction_1;
    data_2 = "the second predicting is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(data_1 + data_2);
    synth.speak(utterThis);

}


function check(){
img=document.getElementById("capture_img");
classifier.classify(img,gotresult);
}

function gotresult(error,results){
    if (error) {
        console.error(error);


    }
    else{
        console.log(results);
        document.getElementById("emotion_1").innerHTML= results[0].label;
        document.getElementById("emotion_2").innerHTML = results[1].label;
        prediction_1= results[0].label;
        prediction_2 = results[1].label;
        speak()

        if(results[0].label == "thumbs up"){
            document.getElementById("emoji_1").innerHTML="&#128077;";
        }

        if(results[0].label == "thumbs down"){
            document.getElementById("emoji_1").innerHTML="&#128078;";
        }

        if(results[0].label == "wave"){
            document.getElementById("emoji_1").innerHTML="&#128400;";
        }

        if(results[0].label == "ok"){
            document.getElementById("emoji_1").innerHTML="&#128076;";
        }

        if(results[1].label == "thumbs up"){
            document.getElementById("emoji_2").innerHTML="&#128077;";
        }


        if(results[1].label == "thumbs down"){
            document.getElementById("emoji_2").innerHTML="&#128078;";
        }


        
        if(results[1].label == "wave"){
            document.getElementById("emoji_2").innerHTML="&#128400;";
        }

        if(results[1].label == "ok"){
            document.getElementById("emoji_2").innerHTML="&#128076;";
        }
    }
}
