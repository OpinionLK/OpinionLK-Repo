import ComManager from "../models/ComManagerModel.js";

export const Getmembers = async (req, res) => {
  const members = await ComManager.find();
  res.send(members);
};

export const Savemember = async (req, res) => {

  const member = {
    ManagerName: req.body.ManagerName,
    ManagerEmail: req.body.ManagerEmail,
    ManagerPhone: req.body.ManagerPhone,
    ManagerNic: req.body.ManagerNic,
  }

  await ComManager.create( member)
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

export const Updatemember = (req, res) => {
  const { id } = req.params;
  const { member } = req.body;

  ComManager.findByIdAndUpdate(id, { member })
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

export const Deletemember = (req, res) => {
  const { id } = req.params;

  ComManager.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
