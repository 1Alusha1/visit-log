import { useEffect, useState } from "react";
import { controleVisit, getOwnGroup } from "../async/async";

const Group = () => {
  let { username } = JSON.parse(localStorage.getItem("userInfo"));
  let [subject, setSubject] = useState("");
  let [group, setGroup] = useState();
  useEffect(() => {
    getOwnGroup({ monitor: username }, (data) => {
      setGroup(data);
    });
  }, []);

  const controle = async (was, studentId) => {
    let dto = {
      subject,
      date: new Date(),
      was,
      studentId,
    };
    controleVisit(dto, (data) => console.log(data));
  };
  console.log(subject)
  return (
    <div className="group">
      <div className="group-info">
        <div className="group-info__monitor">
          <p className="group-name">
            <span>Группа:</span> {group?.name}
          </p>
          <p className="group-monitor">
            <span>Староста:</span> {group?.monitor}
          </p>
        </div>
        <div className="group-info__subject">
          <p>Выбирете предмет: </p>
          <select name="subject" onChange={(e) => setSubject(e.target.value)}>
            <option value="Math">Математика</option>
            <option value="UA_lang">Украинский</option>
            <option value="EN_lang">Английский</option>
            <option value="Literature">Литература</option>
          </select>
        </div>
      </div>
      <div className="group-list">
        <p>Список студентов:</p>
        {group?.students.length ? (
          group.students.map((i) => (
            <div className="group-student" key={i._id}>
              <div className="student-name">{i.name}</div>
              <div className="group-student__control">
                <button onClick={() => controle(true, i._id)}>Есть</button>
                <button onClick={() => controle(false, i._id)}>Нет</button>
              </div>
            </div>
          ))
        ) : (
          <p>Студентов нет</p>
        )}
      </div>
    </div>
  );
};

export default Group;
