import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export * from 'react-dom';

export function doSomething() {
  console.log("Inside doSomething()");
  console.log(React);
  console.log(uuidv4);
}

doSomething();
