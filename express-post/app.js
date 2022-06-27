const express = require('express')
const app = express()
const hbs = require('hbs')


// this sets hbs as the view engine
app.set('view engine', 'hbs')

// this line is needed for express to be able to accept a post request
app.use(express.urlencoded({ extended: false }))

let accessCount = 0
// middleware sth needs to be executed in between request and the response

// a middleware is just a function
function counter() {
	// the middleware returns a request handler
	return (req, res, next) => {
		accessCount++
		console.log(accessCount)
		// now we proceed as intended
		next()
	}
}

// this line registers a middleware 'globally' -> for every route
app.use(counter())


app.get('/', counter(), (req, res, next) => {
	res.render('home')
});

app.post('/login', (req, res) => {
	// req.body is an object containing the or more name attributes from 
	// the form as key(s) and the value of the input field as it's value
	const { username } = req.body
	console.log(username)
	res.render('dashboard', { username: username })
})

app.listen(3000, () => console.log('listening'))