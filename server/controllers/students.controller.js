import studentsModel from "../models/students.model.js";
import groupModel from "../models/group.model.js";
import allOfGroupsModel from "../models/allOfGroups.model.js";

export const createStudent = async (req, res) => {
  const student = req.body;

  const candidate = await studentsModel.findOne(student);
  if (candidate) {
    return res.status(500).json({ message: "Такой студент уже существует" });
  }
  const group = await groupModel.findOne({ name: student.group });
  if (!group) {
    return res.status(500).json({ message: "Такой группы не существует" });
  }
  let s =  await new studentsModel(student).save();
  await group.updateOne({
    $push: {
      students: s,
    },
  });

  return res.status(200).json(student);
};
