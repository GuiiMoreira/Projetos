const yup = require('./yup');

const registerUserSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),

    name: yup
        .string().
        required(),

    password: yup
        .string()
        .required(),
});

module.exports = registerUserSchema;