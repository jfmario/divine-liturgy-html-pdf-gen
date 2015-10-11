
var app = angular.module ( 'dl', [] );
angular.module ( 'dl' ).controller( 'dlCtrl', function ( $scope, $http )
{
    var DB = window.localStorage;
    var url = 'http://oxdb.johnfmarion.com/query.php' + window.location.search;
    $scope.sr = {};
    
    $http.get ( url ).success ( function ( data )
    {
        $scope.sr = data;
        if ( $scope.sr.antiphon1.length === 0 )
        {
            $scope.sr.antiphon1 = [
                "It is good to give praise unto the Lord, and to chant unto Thy name, O Most High",
                "To proclaim in the morning Thy mercy and Thy truth by night"
            ];
        }
        if ( $scope.sr.antiphon2.length === 0 )
        {
            $scope.sr.antiphon2 = [
                "The Lord is King, He is clothed with majesty. The Lord is clothed with strength and He hath girt Himself.",
                "For He established the world which shall not be shaken.",
                "Holiness becometh Thy house, O Lord, unto length of days."
            ];
        }
        if ( $scope.sr.response2 === '' )
        {
            $scope.sr.response2 = "O Son of God, who rose from the dead, save us who sing to Thee, Alleluia!";
        }
    }).error ( function ()
    {
        $scope.error = true;
    });
    
    for ( var setting in DB )
    {
        $scope [ setting ] = DB.getItem ( setting );
    }
    
    $scope.greatLitanyLines = [
        "In peace let us pray to the Lord.",
        "For peace from above, for the salvation of our souls, let us pray to the Lord.",
        "For peace of the whole word, for the good estate of the holy churches of God, and for the union of all men, let us pray to the Lord.",
        "For this holy House, and for those who enter with faith, reverence, and the fear of God, let us pray to the Lord.",
        "For our Father Metropolitan " + $scope.metropolitanName + " and our Bishop " + $scope.bishopName + ", for the venerable Priesthood, the Diaconate in Christ, for all the clergy and the people, let us pray to the Lord.",
        "For the President of the United States and all civil authorities, and for our Armed Forces everywhere, let us pray to the Lord.",
        "For this city, and for every city and land, and for the faithful who dwell therein, let us pray to the Lord.",
        "For healthful seasons, for abundance of the fruits of the Earth, and for peaceful times, let us pray to the Lord.",
        "For travelers by sea, by land, and by air; for the sick and the suffering; for captives and their salvation, let us pray to the Lord.",
        "For our deliverance from all tribulation, wrath, danger, and necessity, let us pray to the Lord.",
        "Help us, save us, have mercy on us, and keep us, O God, by Thy grace.",
        "Calling to remembrance our all-holy, immaculate, most blessed and glorious Lady Theotokos and ever virgin Mary, with all the Saints, let us commend ourselves and each other, and all our lives unto Christ our God.",
        "O Lord our God, Whose might is beyond compare, Whose glory is incomprehensible, Whose mercy is boundless, and Whose love towards mankind is ineffable: Do Thou, Thyself, O Master, in Thy tender compassion look down upon us and upon this holy house, and grant us and those who pray with us Thy rich mercies and compassions. For unto Thee are due all glory, honor, and worship, to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages.",
    ];
    $scope.littleLitanyLines =  [
        "gain and again, in peace, let us pray to the Lord.",
        "Help us, save us, have mercy on us, and keep us, O God, by Thy grace.",
        "Calling into remembrance our all-holy, immaculate, most blessed and glorious Lady Theotokos and ever-virgin Mary, with all the saints, let us commend ourselves and each other and all our life unto Christ our God."
    ];
});