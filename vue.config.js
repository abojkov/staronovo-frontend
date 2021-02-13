module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://192.168.0.116:7001',
                changeOrigin: true
            },
        }
    }
}