module.exports = [
    {
        context: ['/proxy/entry'],
        target: 'http://localhost:1110/',
        secure: false,
        logLevel: 'debug',
        changeOrigin: true,
        pathRewrite: {'^/proxy/entry': '/entry'},
        verbose: true
    },

    // ==================== External points ===============================
    {
        context: ['/proxy/viaCep'],
        target: 'http://viacep.com.br/ws/',
        secure: false,
        logLevel: 'debug',
        changeOrigin: true,
        pathRewrite: {'^/proxy/viaCep': ''},
        verbose: true
    },
    // {
    //     context: ['/proxy/biErp'],
    //     target: 'http://bierp.unikasistemas.com:8082/api/v1/',
    //     secure: false,
    //     logLevel: 'debug',
    //     changeOrigin: true,
    //     pathRewrite: {'^/proxy/biErp': ''}
    // },
];
