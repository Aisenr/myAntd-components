import ParseCode from '../parse-code';

export default function regionParse(regionCodes = []) {
  return regionCodes.map((item) => {
    let regionObj = ParseCode.getObj(item.toString());
    if (regionObj.label === '市辖区') {
      regionObj = ParseCode.getObj(item.toString().substr(0, 2));
    }
    return regionObj;
  });
}
