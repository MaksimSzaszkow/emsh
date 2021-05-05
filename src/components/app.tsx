import { FunctionalComponent, h } from "preact";

import Header from "./header";
import Compiler from "./compiler";

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root">
      <Header />
      <Compiler />
    </div>
  );
};

export default App;
