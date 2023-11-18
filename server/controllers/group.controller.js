import allOfGroups from "../models/allOfGroups.model.js";
import groupModel from "../models/group.model.js";

export const getGroups = async (req, res) => {
  const groups = await allOfGroups.find();
  return res.status(200).json(groups);
};

export const getOwnGroup = async (req, res) => {
  const { monitor } = req.body;

  const group = await groupModel.findOne({ monitor });

  res.status(200).json(group);
};
