/* Author: Mitsuo
 *
 * OUT OF USE
 * 
 * Implementa rutas protegidas
 * 
 * - Si no se pasa requireRole,  ruta publica (no protegida)
 */
import { Route, Redirect } from 'react-router-dom';
import HeaderUser from '../components/PageComponents/HeaderUser';

/* CRITICAL BUG:  "si un `requiredRoles` no incluye el rol del usuario ni -1,
                  todas las rutas son redirigidas a /login" */
function ProtectedRoute(props) {
    const { path, page, requireRoles = [], usuario, setUsuario } = props
    if (requireRoles.includes(-1)) {
        /* special value for login page */
        /* Show only page,  no header and sidebar (Drawer) */
        return (
            <Route exact path={path}>
                <props.page usuario={usuario} setUsuario={setUsuario} />
            </Route>
        )
    } else if (requireRoles.includes(usuario.roleID)) {
        return (
            <Route exact path={path}>
                <HeaderUser
                    nombre={usuario.fullName}
                    rol={usuario.roleName}
                    idRol={usuario.roleID}
                    foto={usuario.fotoUsuario}
                    pagina={page}
                />
            </Route>
        )
    } else {
        return (
            <Redirect to='/login' />
        )
    }
}

function PublicRoute(props) {
    const { path, page, usuario, setUsuario } = props
    return (
        <Route exact path={path}>
            <HeaderUser
                nombre={usuario.fullName}
                rol={usuario.roleName}
                idRol={usuario.roleID}
                foto={usuario.fotoUsuario}
                pagina={page}
            />
        </Route>
    )
}

export default function DTRoute(props) {
    /* (not protected by default) */
    const { requireRoles = [], ...other } = props
    return (
        requireRoles.length === 0
            ? <PublicRoute {...other} />
            : <ProtectedRoute {...props} />
    )
};
