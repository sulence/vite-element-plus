const svgs = import.meta.globEager("../../assets/icons/svg/*.svg");

const svgModuleList: string[] = [];
const re = /\/svg\/(.*)\.svg/;
Object.keys(svgs).forEach((key) => {
  const svg = svgs[key].default || {};
  const name = svg.match(re)[1];

  svgModuleList.push(name);
});

export default svgModuleList;
