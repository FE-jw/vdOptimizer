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
	
	var vdo_source = document.querySelectorAll('video source[data-src]');
	var onInit = function(){
		vdo_source.forEach(function(e, idx){
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
			if(trigger_point >= window.scrollY + $vdo.getBoundingClientRect().top && window.scrollY <= window.scrollY + $vdo.getBoundingClientRect().bottom){
				if($vdo.paused){
					$vdo.play();
				}
			}else{
				if(!$vdo.paused){
					$vdo.pause();
				}
			}
		});
	};
	onInit();
	
	window.addEventListener('resize', onInit);
	window.addEventListener('scroll', onInit);
	window.addEventListener('orientationchange', onInit);
}