# Notitas generales

VSCode tiene visualizador de Markdown.  Shortcut:  `Ctrl + Shift + V`

## React + Material UI

**Utilizando el `theme`**

Los atributos de `theme` provistos por `ThemeProvider` en la raiz de del arbol
de componentes.  Son accesibles desde:

- Atributo `sx` de los componentes (CSS / JSS)
  > Only the `Box`, `Stack`, `Typography`, and `Grid` components accept the
  > system properties as props for the above reason. These components are
  > designed to solve CSS problems, they are CSS component utilities.  
  > [MUI system basics](https://mui.com/system/basics/#api-tradeoff)
- Atributos de los componentes de MUI
- Dentro de las funciones raras que la gente crack usa para hacer 
  **reusable components**

Adicionalmente, para definir estilos simplecitos y bonitos usar:

```JS
import { useTheme } from '@mui/material/styles';

export default function MyComponent() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}
```

Ref: https://mui.com/styles/api/#usetheme-theme


**Reusable / custom components**

Las reglas/clases de tipo `& .CSSclassaname` son aplicadas a todos los elementos
hijos del elemento al que se le aplique la regla.

[styled-components's API](https://mui.com/system/basics/):  *Crear* un 
componente con los estilos (MUI5 advocates for the use of *system* (i.e., the `sx` prop) instead of this to apply "one-off" styles)

```JS
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';

const SuccessSlider = styled(Slider)(({ theme }) => ({
  width: 300,
  color: theme.palette.success.main,
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
}));

export default function StyledCustomization() {
  return <SuccessSlider defaultValue={30} />;
}
```

Ref: https://mui.com/customization/how-to-customize/#2-reusable-style-overrides

MUI4 (legacy): Crear un objeto que contenga los estilos en CSS

```JS
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root, & .MuiButton-root' : {
            width: '100%',      // left to right
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    }
}))

export function Form(props) {
    const classes = useStyles();
    const {children, ...other} = props;

    return (
        <form className={classes.root}> </form>
    )
}
```


## CSS dentro de React

**Espacio final dentro de un `<Typography>`**

```JS
<Typography paragraph={true}> ¿No tienes una cuenta?
    {'\u00A0'}
    <Link href="#" >
        Regístrate
    </Link>
</Typography>
```
Ref: https://stackoverflow.com/questions/37909134/nbsp-jsx-not-working


**Ajustar la anchura de un "Input"  (MuiTextField)**

```JS
<Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="fullWidth" id="fullWidth" />
    </Box>
  );
```

Ref: https://mui.com/components/text-fields/#full-width

## Links

React:
- [Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [Router-DOM](https://reactrouter.com/web/example/basic)

React + Material UI:
- [CodAffection](https://www.youtube.com/watch?v=bL-ZwwF6wTc&list=PLjC4UKOOcfDQtvkTBfjqeWP8EJKi_WaUn&index=1)

CSS:
- [units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)

CSS, HTML and React components "properties":
- [CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)
- [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)
- [MUI5 system props](https://mui.com/system/properties/)
- [MUI5 customization guide](https://mui.com/customization/how-to-customize/#2-reusable-style-overrides)

Authenication:
- [20m tutorial](https://www.youtube.com/watch?v=MqczHS3Z2bc)
- [OAuth 2.0 API manual](https://developers.google.com/identity/protocols/oauth2)
- [React Google Login package](https://www.npmjs.com/package/react-google-login)

Axios:
- [Blog jasonwatmore](https://jasonwatmore.com/post/2020/07/17/react-axios-http-get-request-examples)

Git / GitHub:
- [Syncing your branch](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/keeping-your-local-repository-in-sync-with-github/syncing-your-branch)

CSS Flexbox (Chung):
- [A Complete Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Cheatsheet](https://yoksel.github.io/flex-cheatsheet/)
