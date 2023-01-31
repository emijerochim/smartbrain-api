// Path: controllers\image.js
import * as dotenv from "dotenv";
dotenv.config();
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: process.env.API_KEY,
});

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      db("users")
        .count("id as count")
        .then((data) => {
          if (entries[0] > 5000 / data[0].count) {
            res.status(400).json("Maximum entry limit reached");
          } else {
            res.json(entries[0]);
          }
        });
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(400).json("unable to work with api");
    });
};

const calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById("input-image");
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - clarifaiFace.right_col * width,
    bottomRow: height - clarifaiFace.bottom_row * height,
  };
};

export default {
  handleImage,
  calculateFaceLocation,
  handleApiCall,
};

/*
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
const modelID = "a403429f2ddf4b49b307e318f00e528b";

metadata.set("authorization", `Key ${process.env.API_KEY}`);


const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json.data)
    .catch((err) => {
      res.status(400).json("unable to work with api");
    });
};


{"inputs":[{"data":{"image":{"url":"https://media.istockphoto.com/photos/living-that-urban-life-picture-id1165314750?k=20&m=1165314750&s=612x612&w=0&h=QcN0aTHS8IpSbNEnSU9Vno8vUjCEFQs4gbZ72dG6yvM="}}}]}
*/
