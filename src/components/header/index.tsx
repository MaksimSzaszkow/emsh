import { FunctionalComponent, h } from "preact";
import style from "./style.css";

const Header: FunctionalComponent = () => {
  return (
    <header class={style.header}>
      <h1>M-lang compiler</h1>
    </header>
  );
};

export default Header;
