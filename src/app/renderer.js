const { ipcRenderer } = require('electron')
const start_button = document.querySelector('#start_service')
start_button.addEventListener('click', () => {
	ipcRenderer.send('start_service')
	ipcRenderer.on('info_main', (e, args) => {
		if (args == 'connected') {
			$('#start_service').fadeOut(500)
		}
	})
	ipcRenderer.on('data_youtube', (e, args) => {
		if ($('.activity').css('display') == 'none') {
			$('.activity').fadeIn()
		}
		$('.activity .data .title span').text(args.videoTitle)
		$('.activity  .background img').attr(
			'src',
			`http://i.ytimg.com/vi/${args.id}/maxresdefault.jpg`
		)
		$('.activity .data .sub_title span').text(args.channel)
	})
})
