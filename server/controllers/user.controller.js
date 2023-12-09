import allOfGroupsModel from "../models/allOfGroups.model.js";
import groupModel from "../models/group.model.js";
import studentsModel from "../models/students.model.js";

export const controleVisit = async (req, res) => {
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
  await new allOfGroupsModel({
    name,
  }).save();

  res.status(200).json({ message: "Группа создна" });
};

export const chekStatsStudent = async (req, res) => {
  const { studentName } = req.body;

  const subjects = ["Literature", "EN_lang", "UA_lang", "Math"];

  const student = await studentsModel.findOne({ name: studentName });

  if (!student.attendance.length) {
    return res.status(404).json({ message: "Студент не посещал занятий" });
  }

  let stats = {};
  function rec(subjects) {
    if (!subjects.length) {
      return stats;
    }
    const count = subjects.length;
    let arr = [];
    for (let k = 0; k < student?.attendance.length; k++) {
      if (student.attendance[k].subject == subjects[count - 1]) {
        arr.push(student.attendance[k]);
      }
    }
    stats[subjects[count - 1]] = arr;
    arr = [];
    subjects.pop();
    rec(subjects);
  }
  rec(subjects);
  calculate(stats);
  return res.status(200).json(stats);
};

function calculate(obj) {
  for (let elem in obj) {
    let countWhereWas = 0;
    const countOfLeason = obj[elem].length;

    for (let i = 0; i < obj[elem].length; i++) {
      if (obj[elem][i].was) {
        countWhereWas++;
      }
    }

    obj[elem] = {
      ...obj[elem],
      countOfLeason,
      countWhereWas,
      visitProcent: Math.floor((countWhereWas * 100) / countOfLeason) + "%",
    };
  }
}
