import { FunctionalComponent, h, Fragment } from "preact";
import { useState } from "preact/hooks";
import React from "react";
import style from "./style.module.css";

const Header: FunctionalComponent = () => {
  const [code, setCode] = useState(`x = true\nif x\n\tlog "fajnie"`);
  const [compiled, setCompiled] = useState("");

  const sendCode = async function (): Promise<void> {
    const response = await fetch("http://localhost:3000/javascript", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const newCode = await response.json();

    setCompiled(newCode);
  };

  return (
    <>
      <div class={style.code}>
        <textarea
          value={code}
          onKeyDown={(e): void => {
            if (e.key === "Tab") {
              e.preventDefault();
              const arr = code.split("");
              arr.splice(
                (e.target as HTMLTextAreaElement).selectionEnd,
                0,
                "\t"
              );
              setCode(arr.join(""));
              (e.target as HTMLTextAreaElement).selectionEnd = 0;
            }
          }}
          onInput={(e): void =>
            setCode((e.target as HTMLTextAreaElement).value)
          }
        />
        <pre class={style.overview}>{compiled}</pre>
      </div>
      <button onClick={sendCode}>Compile</button>
    </>
  );
};

export default Header;
