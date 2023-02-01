import * as dotenv from "dotenv";
dotenv.config();
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: process.env.API_KEY,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(400).json("unable to work with api");
    });
};

export default handleApiCall;
