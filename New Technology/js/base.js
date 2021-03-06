var GENERAL = {
	onReady: function() {
		$.material.init();
		
		var app = new Vue({
			el: '#app',
			data: {
				message: 'Hello Vue!'
			}
		});

		var app2 = new Vue({
			el: "#app2",
			data: {
				id: 'inspect-me' /* Bind "id: 'inspect-me'" to <span v-bind:id="id"> */
			}
		});

		var app3 = new Vue({
			el: "#app3",
			data: {
				seen: true
			}
		});

		var app4 = new Vue ({
			el: "#app4",
			data: {
				todos: [
					{ text: 'Learn Javascript' },
					{ text: 'Learn Vue' },
					{ text: 'Build something awesome' }
				]
			}
		});

		var app5 = new Vue ({
			el: "#app5",
			data: {
				message: 'Hello Vue.js!'
			},
			methods: {
				reverseMessage: function() {
					this.message = this.message.split('').reverse().join('')
				}
			}
		});

		var app6 = new Vue({
			el: '#app6',
			data: {
				message: 'Hello Vue!'
			}
		});

		Vue.component('todo-item', {
			props: ['todo'],
			template: '<li>{{ todo.text }}</li>'
		});

		var app7 = new Vue({
			el: '#app7',
			data: {
				todos: [
					{ text: 'Learn Javascript' },
					{ text: 'Learn Vue' },
					{ text: 'Build something awesome' }
				]
			}
		});

		var myModel = {
			name: "Ashley",
			age: 24,
			friends: [
				{ name: "Bob", age: 21 },
				{ name: "Jane", age: 20 },
				{ name: "Anna", age: 29 }
			]
		};

		var myViewModel = new Vue({
			el: '#myView',
			data: myModel,

			//A click handler inside methods
			methods: {
				myClickHandler: function( e ) {
					alert( "Hello " + this.name );
				}
			}
		});
	}
};

$( document ).ready( GENERAL.onReady );