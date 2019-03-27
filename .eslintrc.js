module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],

    // add your custom rules here
    rules: {
        'no-console': 'off',
        'no-useless-escape': 0,
        'indent': [2, 2, {
            'SwitchCase': 1
        }]
    }
}