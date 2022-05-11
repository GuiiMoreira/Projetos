const yup = require('./yup');

const editaruserschema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),

    name: yup
        .string()
        .required()
});

module.exports = editaruserschema;