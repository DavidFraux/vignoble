import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

const typography = new Typography(fairyGateTheme);

//customizing
fairyGateTheme.headerFontFamily = ["Avenir Next", "sans-serif"];
fairyGateTheme.bodyFontFamily= ["Avenir Next", "sans-serif"];



export const { scale, rhythm, options } = typography
export default typography