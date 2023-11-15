import groupModel from "../models/group.model.js";
import studentsModel from "../models/students.model.js";

export const controlVisit = async (req, res) => {
  const { studentId, was, subject, date } = req.body;

  const student = await studentsModel.findOne({ _id: studentId });

  await student.updateOne({
    $push: {
      attendance: {
        subject,
        date,
        was,
      },
    },
  });
  res.status(200).json({ message: "Студент отмечен" });
};

export const createGroup = async (req, res) => {
  const { name } = req.body;

  await new groupModel({
    name,
  }).save();
  res.status(200).json({ message: "Группа создна" });
};
