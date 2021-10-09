import React from 'react'
import { withStyles } from '@mui/styles';
// withStyles & makeStyles (legacy) (MUI4)
// https://www.youtube.com/watch?v=bL-ZwwF6wTc&t=1645s

/* Corresponding CSS */
// .side-menu {
//     display: flex;
//     flex-direction: column;
//     position: absolute;
//     left: 0px;
//     width: 320px;
//     height: 100%;
//     background-color: #253053;
//   }

/* "define CSS rules with JSX" */

// const useStyles = makeStyles({
//     sideMenu: {
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'absolute',
//         left: '0px',
//         width: '320px',
//         height: '100%',
//         backgroundColor: '#243053'
//     }
// })

// export default function SideMenu() {
//     const classes = useStyles();
//     console.log(classes)

//     return (
//         <div className={classes.sideMenu}>

//         </div>
//     )
// }

const style = theme => ({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        // backgroundColor: theme.palette.
        backgroundColor: "#042354"
    }
})

const SideMenu = (props) => {
    const { classes } = props;

    return (
        <div className={classes.sideMenu}>

        </div>
    )
}

/* "higher order functions" */
export default withStyles(style)(SideMenu);
//             ^returns function ^argument for returned function
