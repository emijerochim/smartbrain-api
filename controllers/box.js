import * as dotenv from "dotenv";
dotenv.config();
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: process.env.API_KEY,
});

const box = (req, res) => {
  if (req.body.input) {
    app.models
      .predict(
        {
          id: "face-detection",
          name: "face-detection",
          version: "6dc7e46bc9124c5c8824be4822abe105",
          type: "visual-detector",
        },
        req.body.input
      )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(400).json("unable to work with API"));
  }
};

export default box;
