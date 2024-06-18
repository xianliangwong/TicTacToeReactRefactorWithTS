import { useState } from "react";
import "./Menu.css";
import classNames from "classnames";

type Props = {
  onAction(action: "reset" | "new-round"): void;
};

export default function Menu({ onAction }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="menu" data-id="menu">
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <p>Actions</p>

        {menuOpen ? (
          <span className="material-symbols-outlined"> arrow_drop_up </span>
        ) : (
          <span className="material-symbols-outlined"> arrow_drop_down </span>
        )}
      </button>

      {menuOpen && (
        <div className="items border">
          <button onClick={() => onAction("reset")}>Reset</button>
          <button onClick={() => onAction("new-round")}>New Round</button>
        </div>
      )}
    </div>
  );
}
