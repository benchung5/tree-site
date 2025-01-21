import animation from './animation';
import scroll from './scroll';
import Loader from './parts/loader';

export default function() {
	//hero animation
	const header = document.querySelector('#hero .content-container');
	const slideInAnimation = animation.init(header, {
		duration: 1.5,
		ease: 'ease-in-out',
		propertyTo: [
			['transform', 'translateX(0)'],
			['opacity', '1']
		]
	});
	slideInAnimation.animate();

	//scroll in animation
	scroll.init({el: '.services-row'}, inView);

	const actionItemOne = document.querySelector('.buttons-anim-one');
	const buttonAnimationOne = animation.init(actionItemOne, {
		duration: 1,
		ease: 'ease-in-out',
		propertyTo: [
			['transform', 'translateX(0)'],
			['opacity', '1']
		]
	});

	const actionItemTwo = document.querySelector('.buttons-anim-two');
	const buttonAnimationTwo = animation.init(actionItemTwo, {
		duration: 1,
		ease: 'ease-in-out',
		propertyTo: [
			['transform', 'translateX(0)'],
			['opacity', '1']
		]
	});

	let animated = false;
	function inView(inView) {
		if(inView && (animated == false)) {
			animated = true;
			buttonAnimationOne.animate();
			buttonAnimationTwo.animate();
		}
	}


	/* ==========================================================================
	hero video
	========================================================================== */

	// responsive video poster (works but not being used) ---------------------

	var responsiveVideos = [].slice.call(document.querySelectorAll('.responsive-video-poster'));

	function responsiveVidPoster(size) {
		if(responsiveVideos) {
			for(var i = 0; i < responsiveVideos.length; i++) {
				responsiveVideos[i].poster = responsiveVideos[i].dataset[size];
			}
		}
	}

	window.addEventListener('isMobile', (e) => {
		if(e.detail.isInitialPageLoad) {
			if(e.detail.isMobile) {
				responsiveVidPoster('small');
			} else {
				responsiveVidPoster('large');
			}
		}
	});

	// loading spinner ---------------------

	let loaderContainerEl = document.querySelector("#hero");
	let videoEl = document.querySelector("#hero-video");

	let loader = Loader.init({
	  children: videoEl,
	  minHeight: '20rem',
	  size: '10rem',
	  color: '#2d2c2f',
	  zIndex: 1,
	  backgroundColor: '#000',
	  isInitialPageLoad: true,
	});

	loaderContainerEl.prepend(loader.el);

	videoEl.onloadeddata = () => {
		loader.isLoading(false);
	}

}
