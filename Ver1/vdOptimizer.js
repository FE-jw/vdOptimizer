/*!
	* Version: 1
	* Web: 
	* Github: https://github.com/FE-jw/vdOptimizer
	* Released: 
*/

function vdOptimizer(){
	if(window.NodeList && !NodeList.prototype.forEach){
		NodeList.prototype.forEach = Array.prototype.forEach;
	}
	
	var onInit = function(){
		var vdo_source = document.querySelectorAll('video source[data-src]');

		vdo_source.forEach(function(e){
			var $vdo = e.parentElement;
			var vdo_top = window.scrollY + $vdo.getBoundingClientRect().top - window.innerHeight / 3;
			var trigger_point = window.scrollY + window.innerHeight;

			//Lazyload
			if(e.dataset.src && trigger_point >= vdo_top){
				e.src = e.dataset.src;
				delete e.dataset.src;
	
				$vdo.load();
			}

			//Pause or Play
			if(window.scrollY > window.scrollY + $vdo.getBoundingClientRect().top + $vdo.offsetHeight){
				$vdo.pause();
			}else if($vdo.paused && !e.dataset.src){
				$vdo.play();
			}
		});
	};
	onInit();
	
	window.addEventListener('resize', onInit);
	window.addEventListener('scroll', onInit);
	window.addEventListener('orientationchange', onInit);
}