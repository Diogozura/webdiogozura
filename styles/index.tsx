import { createGlobalStyle } from "styled-components";
import { themes } from "./theme";
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    color:${themes.colors.Branco};
    font-family: 'Iceberg', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #000;
    background-size: fill;
    font-family: 'Iceberg', sans-serif;
  }
 
  html{
  scroll-behavior: smooth;
}
  button {
    cursor: pointer;
  }
`;