import styled from 'styled-components';


export const Container = styled.div`
    display:grid;
    grid-template-columns: auto auto;
    width:40%;
    margin:auto;
    text-align:center;
    margin-top:10%;
    
    column-gap: 10px;
    "minWidth":"400px";
    "maxWidth":"800px";
    
`
export const MyInput = styled.input`
padding:10px;
`


export const MyButton = styled.button`
    width:50px;
    height:50px;
`