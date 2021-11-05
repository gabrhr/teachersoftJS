/* Author: Mitsuo 
 *
 * Same as title in ContentHeader.js,  but as a reusable component.
 */
import React from 'react'
import { Typography } from '@mui/material'

export default function Title(props) {
    const { size } = props

    let variant = "h3"      // size="big"  (default)
    if (size === "medium") {
        variant = "h5"  // h3 > h5 > h3  (LO SIENTO TANTO)
    } else if (size === "small") {
        variant = "h3"
    }
    return (
        <Typography 
            variant={variant}
            // fontWeight={"bold"}
            component="div"
            paddingTop="5px"
            paddingBottom="4px"
            align="left"
            color="primary"
        >
            {props.text}
        </Typography>
    )
}
