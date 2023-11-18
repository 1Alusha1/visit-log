import { useState } from "react";
import { auth } from "../async/async.js";
import {useNavigate} from 'react-router-dom'
const Auth = () => {
  const [dto, setDto] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate() 
  const sendForm = (e) => {
    e.preventDefault();
    auth(dto, (data) => {
      if(data.message){
        return alert(data.message)
      }
      document.cookie = `token=${data} path=*`
      navigate('/dashboard')
    });
  };
  return (
    <div className="auth">
      <p>Вход</p>
      <form onSubmit={sendForm}>
        <input
          type="text"
          placeholder="Имя"
          value={dto.username}
          onChange={(e) => setDto({ ...dto, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={dto.password}
          onChange={(e) => setDto({ ...dto, password: e.target.value })}
        />
        <input type="submit" value="Войти" />
      </form>
    </div>
  );
};

export default Auth;