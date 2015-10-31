
var app = angular.module ( 'dl', [ 'ngSanitize' ] );
angular.module ( 'dl' ).controller( 'dlCtrl', function ( $scope, $http, $sce )
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
        "Again and again, in peace, let us pray to the Lord.",
        "Help us, save us, have mercy on us, and keep us, O God, by Thy grace.",
        "Calling into remembrance our all-holy, immaculate, most blessed and glorious Lady Theotokos and ever-virgin Mary, with all the saints, let us commend ourselves and each other and all our life unto Christ our God."
    ];
    $scope.ferventLitanyLines = [
        "Let us say with all our soul and with all our mind, let us say: O Lord Almighty, the God of our fathers, we pray Thee, harken and have mercy.",
        "Have mercy upon us, O God, according to Thy great goodness, we pray The harken and have mercy.",
        "Again we pray for pious and Orthodox Christians, for our Metropolitan <metropolitan>, for the priests, deacons, and all other clergy, and for all our brethren in Christ.",
        "Again we pray for mercy, life, peace, health, salvation, and visitation for the servants of God, and for the pardon and remission of their sins.",
        "Again we pray for the blessed and ever-memorable founders of this holy temple, and for all our fathers and brethren, the Orthodox departed this life before us, who here and in all the world lie asleep in the Lord, and for the Orthodox servants of God departed this life, and for the pardon and remission of their sins.",
        "Again we pray for those who bear fruit and do good works in thsi holy and all-venerable temple, for those who serve and those who sing, and for all the people here present, who await Thy great and rich mercy.",
        "O Lord our God, accept this fervent supplication of Thy servants, and have mercy upon us according to the multitude of Thy mercy, and send down Thy compassions upon us and upon all Thy people, who await the rich mercy that cometh from Thee. For Thou art a merciful God and lovest mankind, and unto Thee we ascribe glory, to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages."
    ];
    $scope.greatEntranceLines = [
        "All of you, the Lord God remember in His Kingdom, always, now and ever, and unto ages of ages.",
        "Our Metropolitan " + $scope.metropolitanName + ", the Lord God remember in His Kingdom, always, now and ever, and unto ages of ages.",
        "The President of the United States and all civil authorities, and our Armed Forces everywhere, the Lord God remember in His Kingdom, always, now and ever, and unto ages of ages.",
        "The Orthodox servants of God: " + $scope.parishNameList + "... that they may have mercy, life, peace, health, salvation, and visitation, and pardon and forgiveness of sins; the Lord God remember in His Kingdom, always, now and ever, and unto ages of ages.",
        "The Orthodox servants of God departed this life: " + $scope.departedNameList + "... the Lord God remember in His Kingdom, always, now and ever, and unto ages of ages.",
        "All of us, the Lord God remember in His Kingdom, always, now and ever, and unto ages of ages."
    ];
});