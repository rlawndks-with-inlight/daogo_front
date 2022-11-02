

const size = {
  mobileS: "480px",
  mobileL: "770px",
  tabletS: "1023px",
  tabletL: "1280px",
  laptop: "1460px",
  desktop: "1700px",
}

const theme = {
  color: {
    first: "#8e44ad",
    secondary: "#9b59b6",
    third: "#cd84f1",
    strong: "#1a1a1a",
    light: "#ababab",
    background1: "#0d7039",
    background2: "#74ad2c",
    background3: "#a0cb3d",
    font1: "#2c2c2c",
    font2: "#71706F",
    font3: "#cccccc",
    cardColor:[
      {font:'#fff',background:'#024643'},
      {font:'#fff',background:'#31125A'},
      {font:'#fff',background:'#4A02CC'},
      {font:'#000',background:'#f5f6f8'},
    ],
    manager: {
      background1: "#5873e8",
      background2: "#eef1fd",
      background3: "#f5f6f8",
      font1: "#495057",
      font2: "#596275",
      font3: "#7b8190",
    }
  },
  size: {
    font1:'27px',
    font2:'25px',
    font3:'17px',
    font4:'14px',
    font5:'12px',
    mobileS: `(max-width: ${size.mobileS})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tabletS: `(max-width: ${size.tabletS})`,
    tabletL: `(max-width: ${size.tabletL})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(max-width: ${size.desktop})`,
  },
  font: {
    thin: "SpoqaHanSansNeo-Thin",
    light: "SpoqaHanSansNeo-Light",
    regular: "SpoqaHanSansNeo-Regular",
    medium: "SpoqaHanSansNeo-Medium",

  },
  boxShadow: "0px 3px 6px #00000029"
}

export default theme