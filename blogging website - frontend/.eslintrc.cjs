module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true  // Add this line
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // Your rules here
        "react/prop-types": "off"
    }
};
