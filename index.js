// import "samplerSupport.js"
// import "sampleDefinitions.js"
// import "modes.js"

Console.log('test body')
test()

function init(){
	document.head.appendChild(document.createElement('script')).src = "https://cdn.jsdelivr.net/gh/collaborative-music-lab/gibber-resources/samplerSupport.js"
	document.head.appendChild(document.createElement('script')).src = "https://cdn.jsdelivr.net/gh/collaborative-music-lab/gibber-resources/samplerDefinitions.js"
	console.log("gibber support loaded\n")
}

function test(){
	Console.log('test function')
}