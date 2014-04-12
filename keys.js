document.body.onkeydown = function( e ) {
    switch (e.keyCode) {
        case 81:
            var el = document.getElementById("popup");
            el.className = 'show';
            break;
    }
};

document.body.onkeyup = function() {
};
