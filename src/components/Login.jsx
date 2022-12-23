import './login.scss'
import { useState } from 'react'
import { validateUsername } from '../utilities/validateUsername'
import { validateEmail } from '../utilities/validateEmail'
import { validatePassword } from '../utilities/validatePassword'
import { register, auth } from '../services/user'

const Login = ({ setLogged }) => {

    const [state, setState] = useState(true)
    const [checked, setChecked] = useState(true)
    const [error, setError] = useState({ value: false, message: '' })

    const onStateHandler = (ev)=> {
        ev.preventDefault()
        setState(!state)
    }

    const onCheckHandler = ()=> {
        setChecked(!checked)
    }

    const onRegisterHandler = (ev)=> {
        ev.preventDefault()

        let result = validateUsername(ev.target[0].value)
        if (result.error) return setError({ value: result.error, message: result.message })

        result = validateEmail(ev.target[1].value)
        if (result.error) return setError({ value: result.error, message: result.message })

        result = validatePassword(ev.target[2].value)
        if (result.error) return setError({ value: result.error, message: result.message })

        register(ev.target[0].value, ev.target[1].value, ev.target[2].value).then(res => {
            if (res.status === 'error') {
                setError({ value: true, message: res.message })
            } else {
                setError({ value: false })
                setState(!state)
            }
        })
    }

    const onLoginHandler = (ev)=> {
        ev.preventDefault()
        auth(ev.target[0].value, ev.target[1].value).then(res => {
            if (res.status === 'error') {
                setError({ value: true, message: res.message })
            } else {
                setError({ value: false })
                setLogged(true)
            }
        })
    }

    return (
        <div className='loginContainer'>
            <form onSubmit={(ev)=> state ? onLoginHandler(ev) : onRegisterHandler(ev)} className="loginForm">
                <h2>{state ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
                <div className="inputs">
                    {error.value && <span className='error'>{error.message}</span>}
                    {!state && <input placeholder='Usuario' minLength={6} maxLength={16} type="text" className="form-control" id="username" name="username" required />}
                    <input placeholder='Email' minLength={14} maxLength={40} type="email" className="form-control" id="email" name="email" required />
                    <input placeholder='Contraseña' minLength={8} maxLength={20} type="password" className="form-control" name="password" id="password" required/>
                    {state && <input type="checkbox" name="option" id="check" />}
                    {state && <label onClick={onCheckHandler} className={checked ? 'checked' : ''} htmlFor="check">Recordarme</label>}
                    <input className="form-control" type="submit" value={state ? "Iniciar" : "Registrar"} />
                </div>
                <label>{state ? '¿Nuevo usuario? ' : '¿Ya tenes cuenta? '}<button onClick={(ev)=> onStateHandler(ev)}>{state ? "Crear cuenta" : "Iniciar sesión"}</button></label>
            </form>
        </div>
    )
}

export default Login