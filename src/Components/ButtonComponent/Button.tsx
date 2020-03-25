import React, {Component} from 'react';


export const Button:React.FC<{
    className:string, 
    click():void, 
    text: string 
    }> = (props) => {
       
    
    return (
        <>
            <button
                className = {props.className}
                onClick = {props.click}
            >{props.text}</button>
        </>
    )
}