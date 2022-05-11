const yup = require('./yup');

const registerTransactionSchema = yup.object().shape({
    date: yup
        .string()
        .required(),

    week_day: yup
        .string()
        .required(),

    value: yup
        .string()
        .required(),

    category: yup
        .string()
        .required(),

    description: yup
        .string()
        .required(),

    type: yup
        .string()
        .required()
});

module.exports = registerTransactionSchema;