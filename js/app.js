$(function() {
    var wayNames = [$('#wayOnas'), $('#wayOferta'), $('#waySzkolenia'), $('#waySklep'), $('#wayKontakt')];
    var navBarHeight = $('#MenuNavBar');
    var wayPoints = [];

    $.scrollIt({
        upKey: 38,             // key code to navigate to the next section
        downKey: 40,           // key code to navigate to the previous section
        easing: 'linear',      // the easing function for animation
        scrollTime: 600,       // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null,    // function(pageIndex) that is called when page is changed
        topOffset: -navBarHeight.outerHeight()           // offste (in px) for fixed top navigation
    });

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
                    var i = 0;                     //  set your counter to 1

                    function myLoop () {           //  create a loop function
                        setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                            $(tabs[i]).removeClass('trigger');
                            $(tabs[i]).addClass('animated');          //  your code here
                            i++;                     //  increment the counter
                            if (i < tabs.length) {            //  if the counter < 10, call the loop function
                                myLoop();             //  ..  again which will trigger another
                            }                        //  ..  setTimeout()
                        }, 250)
                    }

                    myLoop();                      //  start the loop
                }
            }, {
                offset: function(){
                    var winHeight = 2* $(window).height() /3;
                    return navBarHeight.outerHeight() + winHeight;
                }
            });
        };
    };
    assignWayPoints();



    $(window).resize(function(){
        Waypoint.refreshAll();
    });
});