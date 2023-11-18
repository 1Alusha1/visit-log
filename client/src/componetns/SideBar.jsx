import { Link } from "react-router-dom";

const SideBar = ({ monitorName }) => {
  return (
    <div className="side-bar">
      <p className="monitor_name">{monitorName}</p>
      <div className="side-bar__nav">
        <ul>
          <li>
            <Link to={"/dashboard/group"}>Список студентов</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
