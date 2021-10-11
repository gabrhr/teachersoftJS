import { Grid, Paper } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const markdown = `# Index of testing pages in TeacherSoft

- [employee](${window.location.origin + '/employee'})
- [login screen](${window.location.origin + '/login'})
- [DreamTeam components showcase](${window.location.origin + '/showcase'})
- [here](${window.location.href})

~~~JS
console.log('hello world')
~~~

- [just a linnk](https://reactjs.com)
- [react-markdown](https://github.com/remarkjs/react-markdown)
`

/* Lists current testing pages */
export default function TestIndex() {
    return (
        <Grid m={4}>
            <Paper sx={{p: 4, width: "calc(100% - 40px)"}}>
                <ReactMarkdown children={markdown} />
            </Paper>
        </Grid>
    )
}
