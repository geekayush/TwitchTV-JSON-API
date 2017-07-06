$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/freecodecamp",
        headers: {
            'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
        },
        success: function (data1) {
            debugger;
            if (data1.stream === null) {
                $("#fccStatus").html("Free Code Camp is currently OFFLINE!");
            } else {
                $("#fccStatus").html("Free Code Camp is currently ONLINE!");
            }
        }
    });

    $.ajax({
        type: "GET",

        url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
        headers: {
            'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
        },
        success: function (data2) {
            for (var i = 0; i < data2.follows.length; i++) {
                console.log(data2.follows[0]);
                var displayName = data2.follows[i].channel.display_name;
                var logo = data2.follows[i].channel.logo;
                var status = data2.follows[i].channel.status;
                if (logo == null) {
                    logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/No_icon_red.svg/2000px-No_icon_red.svg.png";
                }
                $("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md-2 col-md-offset-2'>" +
                    "<a href='https://www.twitch.tv/" + displayName + "'><img src='" + logo + "'></a>" +
                    "</div>" + "<div class='col-md-2 col-md-offset-1 text-center'>" + displayName + "</div>" + "<div class='col-md-2 col-md-offset-1'>" + status + "</div></div>");
            }
        }
    });
    var deletedFollowers = ['brunofin', 'comster404'];
    for (var i = 0; i < deletedFollowers.length; i++) {
        $.ajax({
            type: "GET",
            url: "https://api.twitch.tv/kraken/streams/" + deletedFollowers[i],
            headers: {
                'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
            },
            error: function (data3) {
                var logo = "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-error-icon.png";
                var displayName = data3.statusText;
                var status = data3.status;
                $("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
                    "<a  href='https://www.twitch.tv/" + displayName + +"'><img src='" + logo + "'></a>" +
                    "</div>" + "<div class='col-md-4 text-center'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
            }
        });

    }

});
