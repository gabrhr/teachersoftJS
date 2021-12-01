import { Typography, Grid } from "@mui/material";

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

    <Grid item xs={12}>
        <Grid container   spacing={2}>
           <Grid item xs={4}>
            <Typography  fontWeight="550" my={1}  sx={{color:"primary.light"}} > {title } </Typography>
           </Grid> 
           <Grid item xs={8}>
            <Typography style={{ wordWrap: "break-word" }} my={1} sx={{color:"primary.light"}}> {text} </Typography>
           </Grid> 
        {
        /* o es Typography o <p>
        <p > {title} </p>
        <p >{text}</p>
        */
        }  
        </Grid>
    </Grid>
    );


};