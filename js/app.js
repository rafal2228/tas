$(function() {
    var wayNames = ['wayOnas', 'wayOferta', 'waySzkolenia', 'waySklep', 'wayKontakt'];
    var navBarHeight = $('#MenuNavBar').outerHeight();
    var wayPoints = [];

    $.scrollIt({
        upKey: 38,             // key code to navigate to the next section
        downKey: 40,           // key code to navigate to the previous section
        easing: 'linear',      // the easing function for animation
        scrollTime: 600,       // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null,    // function(pageIndex) that is called when page is changed
        topOffset: -navBarHeight           // offste (in px) for fixed top navigation
    });

    var assignWayPoints = function(){
        for(var i = 0 ; i < wayNames.length - 1 ; i++){
            wayPoints[i] = $('#' + wayNames[i]).waypoint(function(direction){
                console.log(this.element.id + ' hit')
            }, {
                offset: function(){
                    return navBarHeight;
                }
            });
        };
        wayPoints[4] = $('#' + wayNames[i]).waypoint(function(direction){
            console.log(this.element.id + ' hit')
        }, {
            offset: 'bottom-in-view'
        });
    };
    assignWayPoints();

    $(window).resize(function(){
        navBarHeight = $('#MenuNavBar').outerHeight();
        Waypoint.refreshAll();
    });
});