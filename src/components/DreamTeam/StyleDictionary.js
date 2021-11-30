import { Typography } from "@mui/material";

export default function StyleDictionary(props) {
    let { title, text } = props;

    const stylish = {
        
        borderBottom: "1px solid white",
        //borderBottom: "2px white",
        display: "flex",
        justifyContent: "space-between",
    }
    const SubtitulosTable={display:"flex"  }

    return (

    <div style={stylish}>
        <Typography style={SubtitulosTable} > {title} </Typography>
        <Typography style={SubtitulosTable} > {text} </Typography>
        {
        /* o es Typography o <p>
        <p > {title} </p>
        <p >{text}</p>
        */
        }    
    </div>
    );


};