import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";
export function doSomething() {
  console.log("Inside doSomething()");
  console.log("react", React);
  console.log("react-dom", ReactDOM);
  console.log("uuid", uuidv4);
  console.log("lodash", _);
}

doSomething();
