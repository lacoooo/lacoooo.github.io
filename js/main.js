;
let setting = {
	container: '#app',
	segments: 26,
	strokeWidth: 0.2
}

let kaleido = new Kaleido(setting)

document.onkeydown = function (event) {
	var e = event || window.event || arguments.callee.caller.arguments[0]
	if (e && e.keyCode == 32) {
		kaleido.delete()
		kaleido = new Kaleido(setting)
	} else if (e && e.keyCode == 67) {
		kaleido.showGuide()
	}
}