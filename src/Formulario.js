import { useReducer } from "react";

const initialFormState = {
    firstName: {
        value: '',
        error: null,
    },
    lastName: {
        value: '',
        error: null,
    },
    email: {
        value: '',
        error: null,
    },
};

// Función reducer para manejar las acciones del formulario
const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    value: action.value,
                },
            };
        case 'SET_ERROR':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    error: action.error,
                },
            };
        default:
            return state;
    }
};

// Componente de entrada (Input)
const Input = ({ field, label, formState, dispatch }) => (
    <div>
        <label>{label}</label>
        <input
            type="text"
            value={formState[field].value}
            onChange={(e) =>
                dispatch({
                    type: 'UPDATE_FIELD',
                    field,
                    value: e.target.value,
                })
            }
            onBlur={() => handleValidation(field, formState[field].value, dispatch)}
        />
        {formState[field].error && (
            <p style={{ color: 'red' }}>{formState[field].error}</p>
        )}
    </div>
);

// Función para validar el email
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? null : 'Email inválido';
};

// Función para manejar la validación
const handleValidation = (field, value, dispatch) => {
    let error;
    switch (field) {
        case 'email':
            error = validateEmail(value);
            break;
        // Agrega más reglas de validación para otros campos si es necesario
        default:
            error = null;
    }
    dispatch({ type: 'SET_ERROR', field, error });
};

// Componente del formulario
const Formulario = () => {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar lógica para manejar el envío del formulario
        // Por ejemplo, verificar si hay errores antes de enviar
        const hasErrors = Object.values(formState).some(field => field.error);
        if (!hasErrors) {
            console.log('Formulario enviado:', formState);
        } else {
            console.log('El formulario contiene errores');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input field="firstName" label="Nombre" formState={formState} dispatch={dispatch} />
            <Input field="lastName" label="Apellido" formState={formState} dispatch={dispatch} />
            <Input field="email" label="Correo Electrónico" formState={formState} dispatch={dispatch} />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;