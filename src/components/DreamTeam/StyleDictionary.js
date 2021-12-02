import { Link, Typography, Grid } from "@mui/material";

const stylish = {
        
    borderBottom: "1px solid white",
    //borderBottom: "2px white",
    display: "flex",
    justifyContent: "space-between",
}

function ConditionalTypography(props) {
    let { text, url } = props;
    if (url != null) {    
        return <Link href={url.indexOf("http") == 0 ? url : "http://" + url } color="inherit">{text}</Link>;  
    }  
    return  <Typography style={{ wordWrap: "break-word" }} my={1} sx={{color:"primary.light"}}> {text} </Typography>

}

export default function StyleDictionary(props) {
    let { title, text, url } = props;

  
    const SubtitulosTable={display:"flex"  }

    return (

    <Grid item xs={12}>
        <Grid container   spacing={2}>
           <Grid item xs={4}>
            <Typography  fontWeight="550" my={1}  sx={{color:"primary.light"}} > {title } </Typography>
           </Grid> 
           <Grid item xs={8}>
                
            <ConditionalTypography text={text} url={url} />
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