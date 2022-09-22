$(function()
{
    var playerTrack = $("#player-track");
	var bgArtwork = $('#bg-artwork');
	var bgArtworkUrl;
	var albumName = $('#album-name');
	var trackName = $('#track-name');
	var albumArt = $('#album-art'),
		sArea = $('#s-area'),
		seekBar = $('#seek-bar'),
		trackTime = $('#track-time'),
		insTime = $('#ins-time'),
		sHover = $('#s-hover'),
		playPauseButton = $("#play-pause-button"),
		i = playPauseButton.find('i'),
		tProgress = $('#current-time'),
		tTime = $('#track-length'),
		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
		buffInterval = null, tFlag = false;
	
	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
	
	var songs = [{
		artist: "Khánh Ly cover",
		name: "Diễm Xưa",
		url: "Musics/DiemXua.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	}, {
        artist: "Khánh Ly cover",
		name: "Còn Tuổi Nào Cho Em",
		url: "Musics/ConTuoiNaoChoEm.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Khánh Ly cover",
		name: "Hạ Trắng",
		url: "Musics/HaTrang.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Khánh Ly cover",
		name: "Biển Tình",
		url: "Musics/BienTinh.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Hà Nhi",
		name: "Dĩ Vãng Nhạt Nhoà",
		url: "Musics/DiVangNhatNhoa_HaNhi.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Dig Didzay",
		name: "Nếu Anh Đi",
		url: "Musics/NeuAnhDi.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Khánh Ly cover",
		name: "Tuổi Đá Buồn",
		url: "Musics/TuoiDaBuon.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Khánh Ly cover",
		name: "Một Cõi Đi Về",
		url: "Musics/ConTuoiNaoChoEm.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Ca sĩ không xác định",
		name: "Cát Bụi Cuộc Đời",
		url: "Musics/CatBuiCuocDoi.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Nguyễn Hưng",
		name: "Chỉ Riêng Mình Ta",
		url: "Musics/ChiRiengMinhTa.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Tát Đỉnh Đỉnh",
		name: "Tay Trái Chỉ Trăng",
		url: "Musics/TayTraiChiMatTrang.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Mr.T ft Yanbi & Hằng Bingboong",
		name: "Thu Cuối",
		url: "Musics/ThuCuoi.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Wanbi Tuấn Anh",
		name: "Đôi Mắt",
		url: "Musics/DoiMat.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Mỹ Anh ft Khắc Hưng",
		name: "Real Love",
		url: "Musics/RealLove.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Thịnh Suy",
		name: "Chuyện Rằng",
		url: "Musics/ChuyenRang.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "W/n",
		name: "3107",
		url: "Musics/3107.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },{
        artist: "W/n",
		name: "3107 - 2",
		url: "Musics/3107-2.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "W/n",
		name: "3107 - Full 1 2 3 4",
		url: "Musics/3107Full1-2-3-4.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Da LAB",
		name: "Gác Lại Âu Lo",
		url: "Musics/GacLaiAuLo.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Fujii Kaze",
		name: "Shinunoga Ewa",
		url: "Musics/ShinunogaEwa.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Bobby Darin",
		name: "Mack The Knife",
		url: "Musics/Mack the Knife.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Mad Clown",
		name: "Once Again",
		url: "Musics/onceAgain.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Tiger JK",
		name: "Reset",
		url: "Musics/Reset.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Hà Anh Tuấn",
		name: "Tháng Tư Là Lời Nói Dối Của Em",
		url: "Musics/ThangTuLaLoiNoiDoiCuaEm.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "BTS",
		name: "Spring Day",
		url: "Musics/SpringDay.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }, {
        artist: "Avin Lu ft Suni Hạ Linh",
		name: "Nắng Thuỷ Tinh",
		url: "Musics/NangThuyTinh.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }
];
	
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	songs = shuffle(songs);

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    	
	function showHover(event)
	{
		seekBarPos = sArea.offset(); 
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());
		
		sHover.width(seekT);
		
		cM = seekLoc / 60;
		
		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
		playProgress = (audio.currentTime / audio.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
			selectTrack(1);
		}
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');
			
			currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
	{	
        audio = new Audio();

		selectTrack(0);
		
		audio.loop = false;
		
		playPauseButton.on('click',playPause);
		
		sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
		
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
	}
    
	initPlayer();
});
