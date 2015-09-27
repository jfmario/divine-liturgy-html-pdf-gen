
var ms_day = 86400000;
var months = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP',
    'OCT', 'NOV', 'DEC' ];
    
function daycodeCalendar ( date )
{
    var monthcode = months [ date.getMonth () ];
    var daycode = ( '00' + date.getDate () ).slice ( -2 );
    return monthcode + daycode;
}

function daycodePaschal ( date )
{
    console.log ( 'daycodePaschal' );
    var checkOther = floatingDays ( date );
    console.log ( checkOther );
    if ( checkOther !== null ) { return checkOther; }
    
    var pascha = getPaschaByYear ( date.getUTCFullYear () );
    var paschaFloor = new Date ( pascha.getTime() - 76 * ms_day );
    var paschaCeil = new Date ( pascha.getTime() + 49 * ms_day );
    console.log ( 'pascha:', pascha );
    console.log ( 'paschaFloor:', paschaFloor );
    console.log ( 'paschaCeil:', paschaCeil );
    
    // date is in Paschal cycle
    if ( date >= paschaFloor && date <= paschaCeil )
    {
        var days = parseInt ( ( date.getTime () - pascha.getTime () ) / ms_day );
        // Pascha
        if ( days === 0 ) { return 'PA000'; }
        else if ( days > 0 )
        {
            return 'PA+' + ( '00' + days ).slice ( -2 );
        }
        else
        {
            return 'PA-' + ( '00' + Math.abs ( days ) ).slice ( -2 );
        }
    }
    var lastPentecost = paschaCeil;
    
    if ( date < pascha )
    {
        var lastPascha = new Date ( getPaschaByYear (
                date.getUTCFullYear () - 1) );
        lastPentecost = new Date ( lastPascha.getTime () + 49 * ms_day );
    }
    
    var daysSincePentecost = parseInt ( ( date.getTime () -
            lastPentecost.getTime () ) / ms_day );
    
    if ( daysSincePentecost > 245 )
    {
        // server will be unable to respond properly
        console.log ( 'daysSincePentecost:', daysSincePentecost );
        return 'XXXXX';
    }
    else
    {
        return 'P' + ( '00000' + daysSincePentecost ).slice ( -4 );
    }
}

function floatingDays ( date )
{
    
    console.log ( 'floatingDays', date );
    var year = date.getUTCFullYear ();
    // Sunday checks
    if ( date.getUTCDay() === 0 )
    {
        
        var jul13 = new Date ( year + '/07/13' );
        var jul19 = new Date ( year + '/07/19' );
        
        // Sunday of the Fathers of the First Six Councils
        if ( date >= jul13 && date < jul19 ) { return 'SFO6C'; }
        
        var sep07 = new Date ( year + '09/07' );
        var sep14 = new Date ( year + '09/14' );
        var sep21 = new Date ( year + '09/21' );
        
        // Sunday before the Elevation of the Holy Cross
        if ( date >= sep07 && date < sep14 ) { return 'B0914'; }
        // Sunday after the Elevation of the Holy Cross
        else if ( date > sep14 && date <= sep21 ) { return 'A0914'; }
        
        var oct11 = new Date ( year + '10/09' );
        var oct16 = new Date ( year + '10/16' );
        
        // Sunday of the Fathers of the Seventh Ecumenical Council
        if ( date >= oct11 && date < oct16 ) { return 'SFO7C'; }
        
        var dec11 = new Date ( year + '12/18' );
        var dec18 = new Date ( year + '12/18' );
        var dec25 = new Date ( year + '12/25' );
        var jan01 = new Date ( ( year + 1 ) + '01/01' );
        
        // 2nd Sunday before Nativity (NSU-2)
        if ( date >= dec11 && date < dec18 ) { return 'NSU-2'; }
        // Sunday before Nativity (NSU-1)
        else if ( date >= dec18 && date < dec25 ) { return 'NSU-1'; }
        // Sunday after Nativity (NSU+1)
        else if ( date > dec25 && date <= jan01 ) { return 'NSU+1'; }
        
        var dec31 = new Date ( ( year - 1 ) + '12/18' );
        var jan06 = new Date ( year + '01/06' );
        var jan13 = new Date ( year + '01/13' );
        
        // Sunday before Theophany (TSU-1)
        if ( date > dec31 && date < jan06 ) { return 'TSU-1'; }
        // Sunday after Theophany
        else if ( date > jan06 && date <= jan13 ) { return 'TSU+1'; }
    }
    
    console.log ( 'No special floating day' );
    return null;
}
    
function getPaschaByYear ( year )
{
    
    var y = parseInt ( year / 100 );
    var e = 10 + y - 16 - parseInt ( ( y - 16 ) / 4 );
    
    var g = year % 19;
    var i = ( 19 * g + 15 ) % 30;
    
    var j = ( year + parseInt ( year / 4 ) + i ) % 7;
    var l = i - j;
    
    var p = l + e;
    var pDay = 1 + ( p + 27 + parseInt ( ( p + 6 ) / 40 ) ) % 31;
    var pMonth = 3 + parseInt ( ( p + 26 ) / 30);
    console.log ( 'pascha calculator vars:', year, pMonth, pDay );
    
    return new Date ( year + '/' + pMonth + '/' + pDay );
}

function html()
{
    var dateString = document.getElementById ( 'datePicker' ).value;
    dateString = dateString.replace ( '-', '/' ).replace ( '-', '/' );
    var date = new Date ( dateString );
    
    var params = urlParams ( daycodeCalendar ( date ), daycodePaschal ( date ),
        tone ( date ) );
        
    var paramArray = [];
    
    for ( key in params )
    {
        paramArray.push ( key + '=' + params [ key ] );
    }
    
    var paramString = paramArray.join ( '&' );
    var url = 'divine_liturgy.html?' + paramString;
    
    window.localStorage.setItem ( 'date', date.toLocaleDateString() );
    window.localStorage.setItem ( 'tone', params.tone );
    window.open ( url, '_blank' );
}

function testDate ()
{
    console.log ( document.getElementById ( 'datePicker' ).value );
}

function tone ( date )
{
    
    var pascha = getPaschaByYear( date.getUTCFullYear () );
    if ( date < pascha )
    {
        pascha = getPaschaByYear( date.getUTCFullYear() - 1 );
    }
    
    var diff = parseInt ( ( date.getTime () - pascha.getTime () ) / ms_day );
    var tone = parseInt ( diff / 7 ) % 8;
    
    if ( tone === 0 ) { tone = 8; }
    return tone;
}

function urlParams ( cday, pday, tone )
{
    var obj = {}
    obj.cday = "'" + encodeURIComponent ( cday ) + "'";
    obj.pday = "'" + encodeURIComponent ( pday ) + "'";
    obj.tone = tone;
    return obj;
}