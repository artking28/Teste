module.exports = [
    {
        context: ['/proxy'],
        target: 'http://localhost:3000/',
        secure: false,
        logLevel: 'debug',
        changeOrigin: true,
        pathRewrite: {'^/proxy': ''},
        verbose: true
    },

    // ==================== External points ===============================
    // {
    //     context: ['/proxy/viaCep'],
    //     target: 'http://viacep.com.br/ws/',
    //     secure: false,
    //     logLevel: 'debug',
    //     changeOrigin: true,
    //     pathRewrite: {'^/proxy/viaCep': ''},
    //     verbose: true
    // },
];
