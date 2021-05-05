import { FunctionalComponent, h, Fragment } from "preact";
import { useState } from "preact/hooks";
import React from "react";

const Header: FunctionalComponent = () => {
  const [code, setCode] = useState(`let x = true\nif x\n\tlog "fajnie"`);

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
    console.log(newCode.code);
  };

  return (
    <>
      <div class="code">
        <textarea
          value={code}
          onKeyDown={(e): void => {
            if (e.key === "Tab") {
              e.preventDefault();
              setCode(`${code}\t`);
            }
          }}
          onInput={(e): void =>
            setCode((e.target as HTMLTextAreaElement).value)
          }
        />
        <div class="overview">{}</div>
      </div>
      <button onClick={sendCode}>Compile</button>
    </>
  );
};

export default Header;
