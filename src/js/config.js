require.config({
    paths : {
        jquery: "../jquery/jquery-3.3.1.min",
        bootstrap: "../../../bootstrap/js/bootstrap.min"
    },
    shim : {
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery']
        },        
    }    
})