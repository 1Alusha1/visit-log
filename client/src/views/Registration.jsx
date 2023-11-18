import { useEffect, useState } from "react";
import { getGroups, registration } from "../async/async";

const Registration = () => {
  const [groups, setGroups] = useState();

  const [dto, setDto] = useState({
    username: "",
    group: "Выбирите вашу группу",
    password: "",
  });
  const sendForm = (e) => {
    e.preventDefault();
    registration(dto, (data) => {
      alert(data.message);
    });
  };
  useEffect(() => {
    getGroups(setGroups);
  }, []);

  return (
    <div className="auth">
      <p>Регистрация</p>
      <form onSubmit={sendForm}>
        <input
          type="text"
          placeholder="Имя"
          value={dto.username}
          onChange={(e) => setDto({ ...dto, username: e.target.value })}
        />
        <select
          name="group"
          value={dto.group}
          onChange={(e) => setDto({ ...dto, group: e.target.value })}
        >
          <option value="Выбирите вашу группу">Выбирите вашу группу</option>
          {groups?.length &&
            groups.map((i) => <option value={i.name}>{i.name}</option>)}
        </select>
        <input
          type="password"
          placeholder="Пароль"
          value={dto.password}
          onChange={(e) => setDto({ ...dto, password: e.target.value })}
        />
        <input type="submit" value="Зарегестрироваться" />
      </form>
    </div>
  );
};

export default Registration;
