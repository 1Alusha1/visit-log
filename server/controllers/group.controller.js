import allOfGroups from "../models/allOfGroups.model.js";

export const getGroups = async (req, res) => {
  const groups = await allOfGroups.find();
  return res.status(200).json(groups);
};
