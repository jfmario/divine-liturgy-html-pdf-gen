
var DB = window.localStorage;

var DEFAULT_SETTINGS = {
    parishName: "St Catherine's Orthodox Church",
    priestName: "Fr Gregory",
    city: "Aiken",
    state: "SC",
    bishopName: "Bishop Antoun",
    metropolitanName: "Metropolitan Joseph",
    parishHymnTitle: "Hymn of St Catherine",
    parishHymnContent: "Let us praise the all-lauded bride of Christ, " +
            "Catherine, divine guardian of Sinai. She is our help and our " +
            "defense, who by the power of the Spirit, silenced brilliantly " +
            "the affectations of the impious. Crowned as a martyr, she " +
            "seeketh for all Thy great mercy.",
    parishSaintTitle: "Catherine, the Great Martyr of Alexandria, the " +
        "all-Wise Patroness and Protector of this holy church, and " +
        "Guardian of Sinai",
    includeGreatDoxology: true,
    includeCatachumenPrayer: false,
    includeKissOfPeace: true,
    includeExtraPrayer: true,
    extraPrayer: "For Metropolitan Paul, Archbishop John, and for " +
        "their quick release from captivity and safe return, let us " +
        "pray to the Lord.",
    parishNameList: "{names}",
    departedNameList: "{names}"
};

function applySettings ()
{
    for ( var settings in DEFAULT_SETTINGS )
    {
        DB.setItem ( settings, $ ( '#' + settings + 'Input' ).val () );
        if ( $ ( '#' + settings + 'Input' ).is ( ':checkbox' ) )
        {
            DB.setItem ( settings, $ ( '#' + settings + 'Input' ).
                is ( ':checked') );
        }
    }
}

function updateDisplay ()
{
    for ( var settings in DEFAULT_SETTINGS )
    {
        if ( !DB.getItem( settings ) )
        {
            DB.setItem( settings, DEFAULT_SETTINGS [ settings ] );
        }
        $ ( '#' + settings + 'Input' ).val ( DB.getItem ( settings ) );
        if ( DB.getItem( settings ) != 'false' )
        {
            $ ( '#' + settings + 'Input' ).prop ( 'checked', true );
        }
    }
}