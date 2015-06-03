$(function() {
    var wayNames = [$('#wayOnas'), $('#wayOferta'), $('#waySzkolenia'), $('#waySklep'), $('#wayKontakt')];
    var navBarHeight = $('#MenuNavBar');
    var wayPoints = [];
    var ofertaWindow = $('.oferta-window');

    //Size adjusting
    var calcHeight = function(){
        $.each(wayNames, function(key, value){
            var obj = $(value);
            if(obj.height() < ($(window).innerHeight() - navBarHeight.outerHeight())){
                obj.css('min-height', $(window).innerHeight() - navBarHeight.outerHeight() + "px");
            }
        });
        $('.modal-map').height($(window).innerHeight()/2);
    };
    calcHeight();
    var adjustWindowSize = function(offers) {
        for(var i = 0; i < 3; i++)
            $(offers[i]).css('height', 'auto')
        var maxHeight = 0;
        for(var i = 0; i < 3 ; i++){
            if(parseInt($(offers[i]).css('height')) > maxHeight) maxHeight = parseInt($(offers[i]).css('height'));
        }
        for(var i = 0; i < 3; i++)
            $(offers[i]).css('height', maxHeight + "px")
    };

    //Init scrolling
    $.scrollIt({
        upKey: 38,             // key code to navigate to the next section
        downKey: 40,           // key code to navigate to the previous section
        easing: 'linear',      // the easing function for animation
        scrollTime: 600,       // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null,    // function(pageIndex) that is called when page is changed
        topOffset: -50,           // offste (in px) for fixed top navigation
        topOffsetObject: navBarHeight
    });

    //Assigning waypoints
    var assignWayPoints = function(){
        for(var i = 0 ; i < wayNames.length ; i++){
            wayPoints[i] = wayNames[i].waypoint(function(direction){
                var tabs = $(this.element).find('.trigger');
                if((this.key !== 'waypoint-1')&&(this.key !== 'waypoint-4')) {
                    if(tabs !== null){
                        tabs.removeClass('trigger');
                        tabs.addClass('animated');
                    }
                }
                else {
                    var i = 0;
                    function myLoop () {
                        setTimeout(function () {
                            $(tabs[i]).removeClass('trigger');
                            $(tabs[i]).addClass('animated');
                            i++;
                            if (i < tabs.length) {
                                myLoop();
                            }
                        }, 250)
                    };
                    myLoop();
                }
                if(this.key === 'waypoint-1') adjustWindowSize(ofertaWindow);
            }, {
                offset: function(){
                    var winHeight = 2* $(window).height() /3;
                    return navBarHeight.outerHeight() + winHeight;
                }
            });
        };
    };
    assignWayPoints();

    //Google maps stuff
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var mapInitialized = false;
    var tasLatlng = new google.maps.LatLng(53.152593, 16.690242);
    var inputField = document.getElementById('mapDirectionsStart');
    var autocomplete;
    var locationPrediction;

    function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        autocomplete = new google.maps.places.Autocomplete(inputField, {
            country: 'pl'
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            locationPrediction = autocomplete.getPlace();
        });
        var mapOptions = {
            zoom: 16,
            center: tasLatlng,
            disableDefaultUI: true
        };
        map = new google.maps.Map(document.getElementById("mapContent"), mapOptions);
        var markerTas = new google.maps.Marker({
            position: tasLatlng,
            map: map,
            title: 'G³ówna siedziba TAS'
        });
        directionsDisplay.setMap(map);
        mapInitialized = true;
    }
    function calcRoute() {
        var start = inputField.value;
        var end = tasLatlng;
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }

    $("#mapModal").on('shown.bs.modal', function(){
        if(!mapInitialized) initialize();
    });
    $("#mapDirectionsForm").on('submit', function(e){
        e.preventDefault();
        calcRoute();
        return false;
    });

    //Usability
    $("#olxButton").on('click', function(){
        window.open('http://tablica.pl/oferty/uzytkownik/BKRL/', '_blank');
    });
    var navbarCollapse = $('#myNavbar');
    $("#myNavbar>ul>li>a").on('click', function(){
        navbarCollapse.collapse('hide');
    });

    //Menu desktop resize
    var menuLogo = $('.menu-logo');
    var menuHide = $('.menu-hide');
    var containerFluid = $('.container-fluid');
    var menuResize = function(hide){
        if(hide){
            menuLogo.height(18);
            menuLogo.width(65);
            menuHide.css('opacity', '0');
            menuHide.css('height', '0');
            containerFluid.css('margin-top', '50px');
            calcHeight();
        } else if($(window).innerWidth() > 767){
            menuLogo.height(66);
            menuLogo.width(159);
            menuHide.css('opacity', '1');
            menuHide.css('height', '50');
            containerFluid.css('margin-top', '100px');
            calcHeight();
        } else {
            menuLogo.height(20);
            menuLogo.width(77);
        }
    };
    $(window).on('scroll', function(){
        if($(window).innerWidth() > 767){
            console.log('fire');
            menuResize(document.documentElement.scrollTop > 0);
        }
    });

    $(window).resize(function(){
        adjustWindowSize(ofertaWindow);
        calcHeight();
        menuResize(document.documentElement.scrollTop > 0);
        Waypoint.refreshAll();
    });
});