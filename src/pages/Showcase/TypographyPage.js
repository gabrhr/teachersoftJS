/* Author: Mitsuo
 * Date: 2021-11-27
 */
import React from 'react'
import { Typography } from '@mui/material';

export default function TypographyPage() {
    return (
        <>
            <Typography variant="h1">
                h1: Big Title
            </Typography>
            <Typography variant="h2">
                h2: Title
            </Typography>
            <Typography variant="h3">
                h3: Header
            </Typography>
            <Typography variant="h5">
                h5: Header con negrita ps
            </Typography>
            <Typography variant="h4">
                h4: Header
            </Typography>
            <Typography variant="body1">
                body1: The quick brown fox jumps over the lazy dog
            </Typography>
            <Typography variant="body2" color="yellow">
                body2: The quick brown fox jumps over the lazy dog
            </Typography>
            <Typography variant="button" color="yellow">
                button: The quick brown fox jumps over the lazy dog
            </Typography>
            <br/>
            <Typography variant="caption" color="yellow">
                caption: The quick brown fox jumps over the lazy dog
            </Typography>
            <br/>
            <Typography variant="overline" color="yellow">
                overline: The quick brown fox jumps over the lazy dog
            </Typography>
        </>
    )
}
