
var BS_HELP = {
    populateNavbar: function ( id, navArray )
    {
        for ( var i = 0; i < navArray.length; i++ )
        {
            
            var linkString = '<li';
            
            if ( window.location.pathname.split( '/' ).pop () == 
                navArray [ i ].href )
            {
                linkString += ' class="active"';
            }
            
            linkString += '><a href="' + navArray [ i ].href + '"';
            
            if ( navArray [ i ].newtab )
            {
                linkString += ' target="_blank"';
            }
            linkString += 'title="' + navArray [ i ].text + '">' + 
                navArray [ i ].text + '</a></li>';
                
            document.getElementById( id ).innerHTML += linkString;
        }
    }
}