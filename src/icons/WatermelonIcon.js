import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const WatermelonIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={118}
    height={118}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        fill="#3E7B52"
        stroke="#000"
        d="M11.122 52.625c10.976 39.762 46.731 94.701 101.944-3.642L11.122 52.625Z"
      />
      <Path
        fill="#BC0606"
        stroke="#000"
        d="M20.314 52.536c8.592 32.29 37.19 76.738 82.837-3.794l-82.837 3.794Z"
      />
      <Path
        stroke="#2E2E27"
        strokeLinecap="round"
        d="M37.983 62.33c-.44.053-.304.026-.256-.328M54.472 64.76c.242.214.276.2.56-.016M75.16 63.257c.156.138.16.149.256.328M45.19 78.776c-.168-.148-.057.001.101-.114M60.2 80.616c-.26-.23-.29-.29-.559.016"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default WatermelonIcon;
