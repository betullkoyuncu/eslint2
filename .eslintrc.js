module.exports = {
    "settings": {
        "node": {
            "allowModules": ["electron"],
            "resolvePaths": [__dirname],
            "tryExtensions": [".js", ".json", ".node"]
        }
    },
    "rules": {
        "node/no-missing-import": "error"
    }
}

