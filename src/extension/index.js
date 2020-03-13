const platform = window.location.host
if (platform.includes('netflix.com')) {
	const timer = setInterval(() => {
		const data = document.querySelector('.ellipsize-text')
		if (data) {
			//check if the users is watching
			if (data.getElementsByTagName('h4')[0] != undefined) {
				//the users is watching a show
				const showTitle = data.getElementsByTagName('h4')[0].textContent
				const [epAndSeason, epTitle] = data.getElementsByTagName('span')
				chrome.runtime.sendMessage({
					//send data to background
					platform: 'Netflix',
					type: 'Serie',
					title: showTitle,
					point: epAndSeason.textContent,
					epTitle: epTitle.textContent,
				})
			} else {
				// user is watching a movie
				const movieTitle = data.textContent
				chrome.runtime.sendMessage({
					//send data to background
					platform: 'Netflix',
					type: 'Movie',
					title: movieTitle,
				})
			}
		}
	}, 6000)
} else if (platform.includes('youtube.com')) {
	const timer = setInterval(() => {
		if (window.location.pathname == '/watch') {
			// if user is watching a video{}
			const data = document.querySelector(
				'h1.ytd-video-primary-info-renderer yt-formatted-string'
			)
			const channelName = document.querySelector(
				'div.ytd-channel-name yt-formatted-string a'
			).textContent
			console.log(channelName)
			chrome.runtime.sendMessage({
				//send data to background
				action: 'watching',
				platform: 'Youtube',
				videoTitle: data.textContent,
				channel: channelName,
			})
		}
	}, 6000)
}
