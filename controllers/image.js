require("dotenv").config();

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
const modelID = "a403429f2ddf4b49b307e318f00e528b";

metadata.set("authorization", `Key ${process.env.APIKEY}`);

const handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
      model_id: modelID,
      inputs: [{ data: { image: { url: req.body.input } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log(
          "Received failed status: " +
            response.status.description +
            "\n" +
            response.status.details
        );
        return;
      }
      res.json(response.outputs[0].data.regions);
      /*
      for (const c of response.outputs[0].data.regions) {
        console.log(c.region_info.bounding_box);
      }
      */
    }
  );
};

/*
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

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = { handleImage, handleApiCall };
