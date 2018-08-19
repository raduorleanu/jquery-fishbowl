// window width and height
var width = $(window).width();
var height = $(window).height();

// selected page elements
var fishA = $("#fish1Id");
var fishB = $("#fish2Id");

// bubbles
var bubble1 = $("#bubble1Id");
var bubble2 = $("#bubble2Id");
var bubble3 = $("#bubble3Id");

// create a random function that takes in two limits: min and max
function randomizer(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min));
}

/*
 Behavior: Whenever you click somewhere in the aquarium the orange fish should move to that location in a
 gradual motion. In addition, when you double click on the orange fish, it should increase its size for a few
 seconds before returning to normal.
 */

function fishATricks() {
    $(document).click(function (event) {
        fishA.animate().stop(true);
        var x = event.pageX;
        var y = event.pageY;
        fishA.animate({left: x - 100, top: y - 100}, 1000, fishABehavior);
    });
}

function fishAEnlarge() {
    fishA.dblclick(function () {
        fishA.stop(true);
        fishA.animate({height: 400, width: 400}, 1000, function () {
            // return the fish to the original size
            fishA.animate({height: 250, width: 250}, 1000, fishAReduce);
        })
    });
}
// added fishAReduce function to be called as soon as the enlarge function is done
function fishAReduce(){
    fishA.click(function()
    {
        fishA.stop(true);
        fishA.animate({height: fishA.height(), width: fishA.width()}, 1000, fishABehavior());
    })
    };

/*
 Whenever you try to move the mouse cursor over the blue fish, it will swiftly move to a random
 location inside the view of the aquarium.
 */

function fishBTricks() {
    fishB.mouseover(function () {
        fishB.animate().stop(true);
        fishB.animate({left: randomizer(0, width - 200), top: randomizer(0, height - 200)}, 400, fishBBehavior)
    });
}

/*
 When a fish is not otherwise being interacted with, it will slowly move around in random
 directions on its own. It will never move outside of the aquarium view though
 */

function fishABehavior() {
    fishA.animate({
        left: randomizer(0, width - 300),
        top: randomizer(0, height - 300)
    }, randomizer(1000, 7000), fishABehavior);
}

function fishBBehavior() {
    fishB.animate({
        left: randomizer(0, width - 100),
        top: randomizer(0, height - 100)
    }, randomizer(1000, 7000), fishBBehavior);
}

/*
 Behavior: Each bubble moves into the view of the aquarium from the bottom of the screen and exists in the
 top. When a bubble moves out of view in the top it will enter anew in the bottom. Where it will enter will
 be random. In addition, when you click on a bubble, it will disappear in a fading manner, but will
 immediately after reappear at a random entry point in the bottom of the screen.
 */

function animeBubbles(bubble, entry) {
    bubble.fadeIn();
    bubble.css({top: height, left: randomizer(0, width - 50)});
    bubble.animate({top: -height}, entry, function () {
        animeBubbles(bubble, entry);
    })
}

$(".bubbleClass").click(function () {
    $(this).stop(true);
    // stop true will stop all the animations, not just the animation at hand
    $(this).fadeOut(300, function () {
        animeBubbles($(this), randomizer(6000, 7000));
    })
});

// calling the functions
fishAEnlarge();
fishATricks();
fishBTricks();
fishABehavior();
fishBBehavior();
animeBubbles(bubble1, randomizer(6000, 7000));
animeBubbles(bubble2, randomizer(6000, 7000));
animeBubbles(bubble3, randomizer(6000, 7000));