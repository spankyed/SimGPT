import { Vector3 } from "@babylonjs/core";

export function setDataProps(obj: any, props: any) {
  Object.keys(props).forEach((key) => {
    
    const toVector3 = (args: any) => {
      return args.map((arg: any) => {
        if (Array.isArray(arg) && arg.length === 3) {
          return new Vector3(...arg);
        }
        return arg;
      })
    }

    // call if it's a function else set property
    if (typeof obj[key] === 'function') {
      obj[key](...toVector3(props[key]));
      return;
    }
    
    obj[key] = props[key];
  });
}