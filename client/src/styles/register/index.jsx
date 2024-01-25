import styled from 'styled-components'

export const RegisterContainer=styled.div`
    max-width: 2600px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const RegisterWrapper=styled.div`
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border: 2px solid black;

    form{
        display: flex;
        flex-direction: column;
    }
`