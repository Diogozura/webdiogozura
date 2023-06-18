import { createGlobalStyle } from "styled-components";
import styled from 'styled-components'
import { theme } from "./theme";
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    color:${theme.colors.Branco};
    font-family: 'Iceberg', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #000;
    background-image: url("/background.svg");
    background-size: fill;
  }
 
  html{
  scroll-behavior: smooth;
}
  button {
    cursor: pointer;
  }
`;