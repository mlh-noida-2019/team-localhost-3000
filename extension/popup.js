fetch('https://api.github.com/users/goelaakash79', {
  headers: new Headers({
    'User-agent': 'Mozilla/4.0 Custom User Agent'
  })
})
.then(response => response.json())
.then(data => {
  console.log(data)
})
.catch(error => console.error(error))

document.getElementById("submit").onclick = function() {
	openWindow();
}

document.getElementById("input")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        openWindow();
    }
});

function openWindow() {
	const url = "https://localhost-mlh.herokuapp.com/login/"
	var input = document.querySelector('.form-input').value;
	// console.log(input);
	window.open(url + input,'_blank');
	console.log(url + input);
}
