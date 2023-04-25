export function setDataProps(obj: any, props: any) {
  Object.keys(props).forEach((key) => {
    obj[key] = props[key];
  });
}