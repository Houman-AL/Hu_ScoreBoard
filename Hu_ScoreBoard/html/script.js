// My Discord: Houman#7172

var thename = 'Hu_ScoreBoard'

const root = thename

var SecLeft = '1.5s'

function ToggleLightMode() {
	$.post('http://'+root+'/datas', JSON.stringify({togglelightmode: true}));
}

function ToggleOff(){
	$('.main').css('animation-name', 'offmain');
	$('.main').css('animation-duration', SecLeft);
	$('.main').fadeOut(800);
}


function ToggleOn(){
	$('.main').css('animation-name', 'onmain');
	$('.main').css('animation-duration', SecLeft);
	$.post('http://'+root+'/datas', JSON.stringify({toggleon: true}));
	$('.main').fadeIn(800);
}

function CopyDiscordLink(link){
	var text = link;
	var node = document.createElement('textarea');
	var selection = document.getSelection();
	node.textContent = text;
	document.body.appendChild(node);
	selection.removeAllRanges();
	node.select();
	document.execCommand('copy');
	selection.removeAllRanges();
	document.body.removeChild(node);

	$('.Discord_Copy_Show').css('animation-name', 'ShowDiscord_Copy_Show');
	$('.Discord_Copy_Show').css('animation-duration', '2s');

	setTimeout(function(){
		$('.Discord_Copy_Show').css('animation-name', 'NONE');
		$('.Discord_Copy_Show').css('animation-duration', '2s');
	}, 3000)

}

$(function () {

	$('.main2').on('click', '.dayereyeonooff', function(){
		ToggleLightMode();
	});

	$('.main2').on('click', '.discordimg', function(){
		$.post('http://'+root+'/copydiscordlink', JSON.stringify({}));
	});


	window.addEventListener('message', function (event) {
		switch (event.data.type) {
			case 'toggleoff':
				ToggleOff();
				break;
			case 'toggleon':
				ToggleOn();
				break;
			case 'copydiscordlink':
				CopyDiscordLink(event.data.link);
				break;
			case 'SetServerName':
				$('.servername').html(event.data.name);
				break;
			case 'cleardata':
				$('.place_players').html('');
				break;
			case 'data':
				var Datas = event.data

				$('.place_players').html('');

				$('.showallplayer').html(Datas.Players+'/'+Datas.MaxPlayer);

				$('.alladmins').html('Admins: '+Datas.AllAdmins);

				$('.myname').html(''+Datas.MyName);
				$('.myping').html('Ping: '+Datas.MyPing);
				$('.myperm').html('Perm: '+Datas.MyPerm);

				$('.police').html(''+Datas.police);
				$('.sheriff').html(''+Datas.sheriff);
				$('.ambulance').html(''+Datas.ambulance);
				$('.mechanic').html(''+Datas.mechanic);
				$('.taxi').html(''+Datas.taxi);


				if (Datas.AllPlayers && Array.isArray(Datas.AllPlayers) ){
					Datas.AllPlayers.sort(function(a, b) {
						if ((a && a.id) && (b && b.id)) {
							let idA = a.id;
							let idB = b.id;
							if (idA < idB)
								return -1 
							if (idA > idB)
								return 1
							return 0
						}
					});
					for (var i = 0; i < Datas.AllPlayers.length; i++) {
						if (Datas.AllPlayers[i]){
							let id = Datas.AllPlayers[i].id;
							let name = Datas.AllPlayers[i].name;
							let perm = Datas.AllPlayers[i].perm;
							let ping = Datas.AllPlayers[i].ping;
		
							let element = '<div class="playerinfo">'+
								'<div class="playername">'+name+' |</div>'+
								'<div class="playerid">ID: '+id+' |</div>'+
								'<div class="playerperm">Perm: '+perm+' |</div>'+
								'<div class="playerping">Ping: '+ping+'ms</div>'+
							'</div>';
		
							$('.place_players').append(element);
						}
					}
				}

				break;
			case 'todarkmode':

				$('.place_on_off_mode').css('animation-name', 'ToDarkMode_place_on_off_mode');
				$('.place_on_off_mode').css('animation-duration', SecLeft);
				$('.place_on_off_mode').css('background', 'rgba(255, 255, 255, 1.0)');

				$('.dayereyeonooff').css('animation-name', 'ToDarkMode_dayereyeonoff');
				$('.dayereyeonooff').css('animation-duration', SecLeft);
				$('.dayereyeonooff').css('background-image', 'url("./img/Dark_A.png")')
				$('.dayereyeonooff').css('right', '12.2vh');

				$('.showallplayer').css('animation-name', 'ToDarkMode_showallplayer');
				$('.showallplayer').css('animation-duration', SecLeft);
				$('.showallplayer').css('background', 'rgba(48, 48, 48, 0.7)');

				$('.place_players').css('animation-name', 'ToDarkMode_placeplayers');
				$('.place_players').css('animation-duration', SecLeft);
				$('.place_players').css('background', 'rgba(30, 30, 50, 0.7)');

				$('.place_mydata').css('animation-name', 'ToDarkMode_placemydata');
				$('.place_mydata').css('animation-duration', SecLeft);
				$('.place_mydata').css('background', 'rgba(15, 20, 30, 0.95)');

				$('.place_jobs').css('animation-name', 'ToDarkMode_placejobs');
				$('.place_jobs').css('animation-duration', SecLeft);
				$('.place_jobs').css('background', 'rgba(15, 20, 30, 0.95)');

				$('.upper').css('animation-name', 'ToDarkMode_upper');
				$('.upper').css('animation-duration', SecLeft);
				$('.upper').css('background', 'rgba(0, 0, 0, 0.85)');

				$('.main').css('animation-name', 'ToDarkMode_main');
				$('.main').css('animation-duration', SecLeft);
				$('.main').css('background', 'rgba(0, 10, 20, 0.9)');

				$('.main').css('animation-name', 'towhitecolor');
				$('.main').css('animation-duration', SecLeft);
				$('.main').css('color', 'rgba(255, 255, 255, 1.0)');
				$('.main').css('text-shadow', '-0.1vh 0 black, 0 0.1vh black, 0.1vh 0 black, 0 -0.1vh black');

				break;
			case 'tolightmode':

				$('.place_on_off_mode').css('animation-name', 'ToLightMode_place_on_off_mode');
				$('.place_on_off_mode').css('animation-duration', SecLeft);
				$('.place_on_off_mode').css('background', 'rgba(0, 0, 0, 1.0)');

				$('.dayereyeonooff').css('animation-name', 'ToLightMode_dayereyeonoff');
				$('.dayereyeonooff').css('animation-duration', SecLeft);
				$('.dayereyeonooff').css('background-image', 'url("./img/Light_A.png")');
				$('.dayereyeonooff').css('right', '30.8vh');

				$('.showallplayer').css('animation-name', 'ToLightMode_showallplayer');
				$('.showallplayer').css('animation-duration', SecLeft);
				$('.showallplayer').css('background', 'rgba(255, 255, 255, 0.7)');

				$('.place_players').css('animation-name', 'ToLightMode_placeplayers');
				$('.place_players').css('animation-duration', SecLeft);
				$('.place_players').css('background', 'rgba(230, 230, 250, 0.7)');

				$('.place_mydata').css('animation-name', 'ToLightMode_placemydata');
				$('.place_mydata').css('animation-duration', SecLeft);
				$('.place_mydata').css('background', 'rgba(215, 220, 230, 0.95)');

				$('.place_jobs').css('animation-name', 'ToLightMode_placejobs');
				$('.place_jobs').css('animation-duration', SecLeft);
				$('.place_jobs').css('background', 'rgba(215, 220, 230, 0.95)');

				$('.upper').css('animation-name', 'ToLightMode_upper');
				$('.upper').css('animation-duration', SecLeft);
				$('.upper').css('background', 'rgba(255, 255, 255, 0.85)');

				$('.main').css('animation-name', 'ToLightMode_main');
				$('.main').css('animation-duration', SecLeft);
				$('.main').css('background', 'rgba(200, 210, 220, 0.9)');

				$('.main').css('animation-name', 'toblackcolor');
				$('.main').css('animation-duration', SecLeft);
				$('.main').css('color', 'rgba(0, 0, 0, 1.0)');
				$('.main').css('text-shadow', '-0.1vh 0 white, 0 0.1vh white, 0.1vh 0 white, 0 -0.1vh white');

				break;
			default:
			break;
		}
	}, false);

	$(document).keyup(function(e){
		if (e.keyCode == 27){
			ToggleOff();
			$.post('http://'+root+'/datas', JSON.stringify({toggleoff: true}));
		}
	})

});

// My Discord: Houman#7172