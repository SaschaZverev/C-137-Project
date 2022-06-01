objects = [];
s = "";
input_text = "";

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480, 380)
    video.hide();
}

function draw()
{
  image(video, 0, 0, 480, 380);
  if(s != "")
  {
      objectDetector.detect(video, gotResult);
      for(i = 0;i < objects.length ;i++){
          document.getElementById("status").innerHTML = "Status : Object Detected";
          console.log(objects.length);
          fill("#ff0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
          noFill();
          stroke("#ff0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

          if(objects[i].label == input_text)
          {
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("object_found").innerHTML = input_text+" Found";
              var synth = window.speechSynthesis;
              var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
              synth.speak(utterThis);
          }
          else
          {
              document.getElementById("object_found").innerHTML = input_text + " Not Found";
          }
      }
  }
}


function start()
{
  objectDetector = ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detecting Objects";
  input_text = document.getElementById("input_id").value;
}

function modelLoaded()
{
  console.log("Model Loaded !");
  s = true;
}

function gotResult(error, results) 
{
  
  if (error) 
  {

    console.log(error);

  }

  console.log(results);
  objects = results;

}