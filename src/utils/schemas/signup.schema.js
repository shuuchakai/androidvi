import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().min(2, 'El nombre es requerido.').required('El nombre es requerido.'),
    email: yup.string().min(2, "El correo electrónico es requerido.").matches(/\S+@(gmail|hotmail|outlook)\.(com|es)$/, 'El correo electrónico no es válido.').required('El correo electrónico es requerido.'),
    password: yup.string().min(8, "La contraseña es requerida.").max(20).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\\+])[A-Za-z\d@$!%*?&\\+]{8,20}$/, 'La contraseña debe tener entre 8 y 20 caracteres, una letra mayúscula, una minúscula y un número.').required('La contraseña es requerida.'),
});

export default schema;