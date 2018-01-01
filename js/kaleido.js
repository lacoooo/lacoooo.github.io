;
class kaleido {
	constructor({container = '#app', segments = 30, strokeWidth = 0.3, bgcolour = '#FFF' }) {
		this.segments = segments
		this.strokeWidth = strokeWidth
		this.bgcolour = bgcolour
		this.container = container

		this.drawing = false
		this.cursor = {}
		this.init()
	}
	init() {
		this.canvas = document.createElement('canvas')
		this.guide = document.createElement('canvas')
		this.ctx = this.canvas.getContext("2d")
		this.guidectx = this.guide.getContext("2d")
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.center = { x: this.width / 2, y: this.height / 2 }
		this.canvas.width = this.width
		this.canvas.height = this.height
		this.guide.width = this.width
		this.guide.height = this.height
		this.ctx.lineCap = "round"

		document.querySelector(this.container).appendChild(this.guide)
		document.querySelector(this.container).appendChild(this.canvas)
		this.canvas.addEventListener("mousedown", this.onDown.bind(this))
		this.canvas.addEventListener("mousemove", this.onMove.bind(this))
		this.canvas.addEventListener("mouseup", this.onUp.bind(this))
		this.drawGuide(this.guidectx)
	}
	drawGuide(ctx) {

		ctx.clearRect(0, 0, this.width, this.height)

		ctx.lineWidth = 0.5
		ctx.strokeStyle = this.bgcolour === "#FFF" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"
		ctx.lineCap = "round"

		ctx.save()
		ctx.beginPath()
		ctx.translate(this.center.x, this.center.y)

		var r = 2 / this.segments * Math.PI

		for (var i = 0; i < this.segments; i++) {
			ctx.rotate(r)
			ctx.moveTo(0, 0)
			ctx.lineTo(0, Math.max(this.width, this.height) * -1)
		}

		ctx.stroke()
		ctx.restore()

	}
	onDown(e) {
		e.stopPropagation()
		e.preventDefault()
		this.drawing = true
		this.cursor.x = this.cursor.lx = e.clientX
		this.cursor.y = this.cursor.ly = e.clientY
	}
	onUp(e) {
		this.drawing = false
	}
	onMove(e) {
		e.stopPropagation()
		e.preventDefault()
		if (!this.drawing) return
		this.ctx.lineWidth = this.strokeWidth

		this.cursor.x = e.clientX
		this.cursor.y = e.clientY

		this.render(this.ctx)

		this.cursor.lx = this.cursor.x
		this.cursor.ly = this.cursor.y

	}
	render(ctx) {
		var r = 2 / this.segments * Math.PI
		for (var i = 0; i < this.segments; ++i) {
			ctx.save()
			ctx.translate(this.center.x, this.center.y)
			ctx.rotate(r * i)
			if ((this.segments % 2 === 0) && i > 0 && i % 2 !== 0) {
				ctx.scale(1, -1)
				if (this.segments % 4 === 0) {
					ctx.rotate(r)
				}
			}
			ctx.beginPath()
			ctx.moveTo(this.cursor.lx - this.width / 2, this.cursor.ly - this.height / 2)
			ctx.lineTo(this.cursor.x - this.width / 2, this.cursor.y - this.height / 2)
			ctx.stroke()
			ctx.closePath()
			ctx.restore()
		}
	}
}








