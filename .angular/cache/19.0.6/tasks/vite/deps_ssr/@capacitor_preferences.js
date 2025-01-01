import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  registerPlugin
} from "./chunk-CQ6WQMGY.js";
import "./chunk-YHCV7DAQ.js";

// node_modules/@capacitor/preferences/dist/esm/index.js
var Preferences = registerPlugin("Preferences", {
  web: () => import("./web-F2QY6X7Y.js").then((m) => new m.PreferencesWeb())
});
export {
  Preferences
};
//# sourceMappingURL=@capacitor_preferences.js.map
