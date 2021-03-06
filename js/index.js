var prev_button, next_button;
var contentWrap;
var disk_inner;
var pageNum = 0;
var totalNum = 0;
var album;
var pointBtnAll;
var bgArray = new Array();
var audio = []
var play_sw = 0;
bgArray[0] = ["#0272a4","#f6a564"];
bgArray[1] = ["#b6bfc8","#36595b"];
bgArray[2] = ["#e58e82","#6f569f"];

window.onload = function(){
    prev_button = document.querySelectorAll("i")[0];
    next_button = document.querySelectorAll("i")[2];
    play_button = document.querySelectorAll("i")[1];
    contentWrap = document.querySelector(".contentWrap");
    disk_inner = document.querySelectorAll(".disk_inner");
    album = document.querySelectorAll(".album");
    pointBtnAll = document.querySelectorAll(".pointWrap li");
    totalNum = album.length;
    

    for(i = 0; i <= 2; i ++){
        audio[i] = new Audio("./audio/"+i+".mp3")
        audio[i].volume = 0.3;
    }

    prev_button.addEventListener("click", function(){   

        play_button.className = "fas fa-play"
        play_sw = 0

        for(i = 0; i <= 2; i ++){
            audio[i].pause()
            
        }


        if(pageNum > 0){
            pageNum --;
        }else{
            pageNum = totalNum -1;
        }

        
         
        pageChangeFunc();
      
        
         
    })

    next_button.addEventListener("click", function(){

        play_button.className = "fas fa-play"
        play_sw = 0
        
        for(i = 0; i <= 2; i ++){
            audio[i].pause()
            play_button.className = "fas fa-play"
        }
        if(pageNum < totalNum-1){
            pageNum ++;
        }else{
            pageNum = 0;
        }
        pageChangeFunc();
    })

    play_button.addEventListener("click", function(){
        
        if(play_sw == 0){
            audio[pageNum].play()
            play_button.className = "fas fa-pause"
            play_sw = 1

        }
        else {
            audio[pageNum].pause()
            play_button.className = "fas fa-play"
            play_sw = 0
        }
        

    })

    for( var i = 0; i < pointBtnAll.length; i++ ){
        (function(idx) {
            pointBtnAll[idx].onclick = function() {
                // alert(idx);
                pageNum = idx;
                pageChangeFunc();
            }
        })(i);
    }

    //alert(mobileChk())

    if(mobileChk()){
        contentWrap.addEventListener("touchstart", touchFunc, false);
        // contentWrap.addEventListener("touchmove", touchFunc, false);
        contentWrap.addEventListener("touchend", touchFunc, false);
    }

    var start_X = 0;
    var end_X = 0;

    function touchFunc(evt){
        // console.log(evt.type)
        // return false;
        // evt.preventDefault();

        var type = null;
        var touch = null;
        
        switch (evt.type) {
            case "touchstart":
                type = "mousedown";
                touch = evt.changedTouches[0];
                start_X = touch.clientX;
                //console.log("start_X : " + start_X);
                end_X = 0;
            break;
            // case "touchmove":
            //     type = "mousemove";
            //     touch = evt.changedTouches[0];
            //     console.log(touch)
            // break;
            case "touchend":
                type = "mouseup";
                touch = evt.changedTouches[0];
                end_X = touch.clientX;

                //console.log("end_X : "+ end_X);

                var chkNum = start_X - end_X;
                var chkNumAbs = Math.abs(chkNum);
                //console.log(chkNum)

                if(chkNumAbs > 100){
                    // //????????? ?????? ????????? ??????
                    if(chkNum < 0){
                        //???????????? ??????
                        pageNum--;
                        //????????? ?????????.
                        //??????????????????.
                    }else {
                        //??????????????? ??????
                        pageNum++;
                        //????????? ?????????.
                        //??????????????????.
                    }
                    pageChangeFunc();
                }
            break;
        }
    }

    //????????????
    // pageNum = 2;
    pageChangeFunc();
}

//????????? ?????? ?????? ??????.
function pageChangeFunc(){

    console.log(pageNum)


    contentWrap.style.background = "linear-gradient(120deg,"+ bgArray[pageNum][0] +", "+ bgArray[pageNum][1] + ")";

    for(var i=0; i<totalNum; i++){
        if(pageNum == i){
            //?????? ?????????(?????????)
            album[i].classList.add("active");
            pointBtnAll[i].classList.add("active");
        }else{
            album[i].classList.remove("active");
            pointBtnAll[i].classList.remove("active");
        }
    }

    disk_inner[pageNum].style.background = bgArray[pageNum][0];
}


function mobileChk() {
    var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (var info in mobileKeyWords) {
        if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
            return true;
        }
    }
    return false;
}

