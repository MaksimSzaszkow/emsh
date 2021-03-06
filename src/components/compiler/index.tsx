import { FunctionalComponent, h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import React from "react";
import style from "./style.module.css";

const Header: FunctionalComponent = () => {
  const [code, setCode] = useState(
    `module test:\nclass test2:\nfunction test3 for param1, param2 does:\n`
  );
  const [compiled, setCompiled] = useState("");
  const [selectionEnd, setSelectionEnd] = useState(0);

  const sendCode = async function (): Promise<void> {
    const js = await fetch("http://localhost:3000/javascript", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const jsCode = await js.json();
    const csharp = await fetch("http://localhost:3000/csharp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const csharpCode = await csharp.json();

    console.log(jsCode);
  };

  useEffect(() => {
    (document.getElementById(
      "pseudocode"
    ) as HTMLTextAreaElement).selectionEnd = selectionEnd;
  }, [selectionEnd]);

  return (
    <>
      <div class={style.code}>
        <textarea
          id="pseudocode"
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
              setSelectionEnd(
                (e.target as HTMLTextAreaElement).selectionEnd + 1
              );
              setCode(arr.join(""));
            }
          }}
          onInput={(e): void =>
            setCode((e.target as HTMLTextAreaElement).value)
          }
        />
        <pre class={style.overview}>{compiled}</pre>
      </div>
      <button onClick={sendCode} class={style.compile}>
        Compile
      </button>
    </>
  );
};

export default Header;
