import Index from './lib/index';
import {state} from './state';

export default class WaveAnimation extends Index {
	componentDidMount(){
		const canvas = document.getElementById('wave-animation');

		if(canvas.getContext){
			this._draw(canvas);
		}else{
			console.warn('failed intialized canvase');
		}
	}
	_draw(canvas){
		const ctx = canvas.getContext('2d');
		const {thirdPage, secondPage} = state.position;
		const height = parseInt(thirdPage) - parseInt(secondPage);
		this._draw_wavy_path(ctx);	
	}


	_draw_wavy_path(ctx,offset=0){
		const draw = ()=>{
			ctx.clearRect(0, 0, 300, 300);
			let region = new Path2D();
			const offsety = 10;

			region.lineTo(0,0);
			region.lineTo(0,30 + offset);
			// Define the points as {x, y}
			
			region.lineTo(300,30 + offset);
			region.lineTo(300,0);
			region.closePath();

			ctx.fillStyle = '#2d2727';
			ctx.fill(region, 'evenodd');

			for(let offsetx = 0; offsetx <= 300 ; offsetx = offsetx + 40){
				let start = { x: 0+offsetx,    y: 20 + offsety  + offset };
				let cp1 =   { x: 10+offsetx,   y: 0  + offsety + offset};
				let cp2 =   { x: 30+offsetx,   y: 80  + offsety + offset};
				let end =   { x: 40+offsetx,   y: 20 + offsety + offset };
				
				region.moveTo(start.x, start.y);
				region.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
			}
			ctx.fillStyle = '#2d2727';
			ctx.fill(region, 'evenodd');
			offset = offset + 0.33;

			const requestId = requestAnimationFrame(draw);


			if(offset >= 1000){
				cancelAnimationFrame(requestId);
			}
		}

		draw();

	}
	render(){
		
		return `
			<svg class="wavy-image" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
			  <defs>
			    <pattern id="pattern-0" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse" viewBox="0 0 100 100">
			      <rect x="0" y="0" width="50" height="100" style="fill: black;"/>
			    </pattern>
			  </defs>
			  <g>
			    <path style="fill: rgb(216, 216, 216);"/>
			    <path style="fill: rgb(216, 216, 216);"/>
			    <path style="fill: rgb(194, 249, 28);" d="M 64.608 158.939 C 75.239 145.974 96.431 120.721 104.333 165.364 C 129.507 264.244 169.715 188.86 184.929 160.332 C 202.208 118.249 234.286 347.057 284.59 201.073 C 304.515 106.311 333.399 195.438 334.439 193.964 C 377.838 318.775 385.804 174.073 407.997 156.142 C 417.08 141.989 428.256 155.612 430.929 155.537 C 432.053 154.729 458.063 175.561 459.717 179.817 C 482.918 204.366 502.362 121.072 499.7 114.296 L 498.121 107.675 L 86.924 110.827 L 0.302 109.771 L 1.564 111.395 C 4.776 87.375 22.037 171.17 57.554 168.491"/>
			    <path style="fill: rgb(135, 207, 235);" d="M 57.175 161.934 C 81.433 124.496 101.701 119.902 109.815 162.314 C 133.148 259.603 173.668 170.211 180.052 152.215 C 213.427 106.43 231.111 334.706 278.888 197.477 C 299.342 107.542 339.714 200.881 340.469 196.007 C 374.015 286.018 385.495 168.404 404.836 149.964 C 419.038 136.423 445.412 158.961 446.974 160.288 C 443.969 159.63 462.995 173.01 466.045 177.307 C 480.678 184.643 494.334 115.566 498.358 115.233 L 502.682 109.077 L 83.937 112.066 L -4.274 111.069 L -0.303 111.179 C 14.069 115.775 32.11 166.712 57.598 163.142"/>
			    <rect x="1.25" y="0.545" width="500.213" height="111.811" style="fill: rgb(135, 207, 235);" rx="2.847" ry="2.847"/>
			  </g>
			</svg>
		`;

	}
};
