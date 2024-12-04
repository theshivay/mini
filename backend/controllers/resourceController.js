const Resource = require("../models/Resource");

exports.createResource = async (req, res) => {
  try {
    const resource = new Resource({ ...req.body, owner: req.user.id });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
