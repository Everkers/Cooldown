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
					type: 'Serie',
					title: showTitle,
					point: epAndSeason.textContent,
					epTitle: epTitle.textContent,
				})
				clearInterval(timer)
			} else {
				// user is watching a movie
				const movieTitle = data.textContent
				chrome.runtime.sendMessage({
					type: 'Movie',
					title: movieTitle,
				})
				clearInterval(timer)
			}
		}
	}, 6000)
}
