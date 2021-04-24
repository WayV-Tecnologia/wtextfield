class WTextField {
	
	constructor(element, options = {}) {
		
		const defaults = {
			padding: "3px",
			width: null,
			fontSize: "13px",
			fontFamily: window.getComputedStyle(element,null).getPropertyValue("font-family"),
			onBlur: null,
			onSetup: null,
			onChange: null
		}
		
		let opts = Object.assign({}, defaults, options);
		
		this.width = opts.width
		this.padding = opts.padding
		this.fontSize = opts.fontSize
		this.fontFamily = opts.fontFamily
		this.options = options
		this.element = element
		this.customElement = document.createElement("div")
		this.labelElement = document.createElement("span")
		setupCustomElement(this)
		if (opts.onSetup != null) {
			opts.onSetup(this)
		}
		this.element.after(this.customElement)
		this.element.style.display = "none"
		
		this.customElement.addEventListener("click", () => {
			this.customElement.style.display = "none"
			this.element.style.display = "inline-block"
			this.element.focus()
		})
		
		this.element.addEventListener("blur", () => {
			this.customElement.style.display = "inline-block"
			this.labelElement.innerText = this.value
			this.element.style.display = "none"
			if (opts.onBlur != null) {
				opts.onBlur(this)
			}
		})

		this.element.addEventListener("change", () => {
			if (opts.onChange != null) {
				opts.onChange(this)
			}
		})
		
	}
	
	set display(text) {
		this.labelElement.innerText = text
	}
	
	get value() {
		return this.element.value
	}
	
}

function setupCustomElement(textField) {
	textField.customElement.classList.add("wtextfield-container")
	textField.labelElement.classList.add("wtextfield-value")
	textField.customElement.append(textField.labelElement)
	textField.labelElement.innerText = textField.value
	textField.element.classList.add("wtextfield-value")
	textField.labelElement.style.padding = textField.padding
	textField.element.style.padding = textField.padding
	if (textField.width != null) {
		textField.labelElement.style.width = textField.width
		textField.element.style.width = textField.width
	} else {
		textField.labelElement.style.width = window.getComputedStyle(textField.element,null).getPropertyValue("width")
	}
	textField.labelElement.style.fontSize = textField.fontSize
	textField.labelElement.style.color = window.getComputedStyle(textField.element,null).getPropertyValue("color")
	textField.element.style.fontSize = textField.fontSize
	textField.labelElement.style.fontFamily = textField.fontFamily
	textField.element.style.fontFamily = textField.fontFamily
}