Vue.component('CoinDetail', {
	// Propiedades que el componente padre le enviará al hijo
	props: ['coin'],

	data() {
		return {
			showPrices: false,
			value: 0
		}
	},

	methods: {
		toggleShowPrices() {
			this.showPrices = !this.showPrices;
		}
	},

	computed: {
		title() {
			return `${this.coin.name} - ${this.coin.symbol}`;
		},

		convertedValue() {
			if (!this.value) {
				return 0;
			}
			return this.value / this.coin.price
		}
	},

	template: `
		<div>
			<img @:mouseover="toggleShowPrices" v-on:mouseout="toggleShowPrices" v-bind:src="coin.img" v-bind:alt="coin.name">
			
			<h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
				{{ title }}
				<!-- directive if -->
				<span v-if="coin.changePercent > 0">👍🏻</span>
				<span v-else-if="coin.changePercent < 0">👎🏻</span>
				<span v-else>🤞🏻</span>

				<span v-on:click="toggleShowPrices">
					{{ showPrices ? '🙈' : '🐵'}}
				</span>
			</h1>

			<input type="number" v-model="value">
			<span>{{ convertedValue }}</span>

			<ul v-show="showPrices">
				<li v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price }"
					v-for="(p, index) in coin.pricesWithDays" v-bind:key="p.day">
					{{ (index + 1) }} - {{ p.day}} - {{ p.value }}
				</li>
			</ul>
		</div>
	`
});

new Vue({
	el: '#app',
	data() {
		return {
			btc: {
				name: 'Bitcoin',
				symbol: 'BTC',
				img: './assets/bitcoin-logo.png',
				changePercent: 10,
				price: 8400,
				pricesWithDays: [
					{ day: 'Monday', value: 8400 },
					{ day: 'Tuesday', value: 7900 },
					{ day: 'Wednesday', value: 8200 },
					{ day: 'Thursday', value: 9000 },
					{ day: 'Friday', value: 9400 },
					{ day: 'Saturday', value: 10000 },
					{ day: 'Sunday', value: 10200 },
				],
			},
			color: 'F4F4F4',
		}
	},

	// methods: {
	// 	toggleShowPrices() {
	// 		this.showPrices = !this.showPrices;
	// 		this.color = this.color.split('').reverse().join('');
	// 	}
	// }
})