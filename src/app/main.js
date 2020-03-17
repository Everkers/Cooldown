const { app, BrowserWindow, ipcMain } = require('electron')
const rpc = require('discord-rpc')
const ws = require('ws')
const client = new rpc.Client({ transport: 'ipc' })
const clientId = '687753371100512310'
const path = require('path')
function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	})
	mainWindow.loadURL(`file://${__dirname}/view/index.html`)
	mainWindow.webContents.openDevTools()
}
app.commandLine.appendSwitch('force-color-profile', 'srgb')
app.whenReady().then(createWindow)
app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('start_service', (e, args) => {
	client.login({ clientId })
	client.on('ready', () => {
		console.log('ready')
		e.sender.send('info_main', 'connected')
	})
	const webSocketServer = new ws.Server({ port: 8080 })
	webSocketServer.on('connection', w => {
		w.on('message', data => {
			const d = JSON.parse(data)
			console.log(d)
			if (d.platform == 'Netflix') {
				if (d.type == 'Serie') {
					client.setActivity({
						details: d.title,
						state: d.epTitle,
						largeImageKey: 'netflix',
						largeImageText: d.point,
						instance: true,
					})
				} else {
					client.setActivity({
						details: d.title,
						largeImageKey: 'netflix',
					})
				}
			} else if (d.platform == 'Youtube') {
				if (!d.action) {
					client.clearActivity()
				} else if (d.action == 'browse') {
					client.setActivity({
						details: `Browsing`,
						state: d.data,
						largeImageKey: 'ytt',
						instance: true,
					})
				} else if (d.action == 'watching') {
					e.sender.send('data_youtube', d)
					client.setActivity({
						details: d.videoTitle,
						state: d.channel,
						largeImageKey: 'ytt',
						startTimestamp: Date.now(),
						instance: true,
					})
				}
			}
		})
	})
})
app.on('activate', function() {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
