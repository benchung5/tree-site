
<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<section id="page-hero">
		    <div class="row">
		        <div class="small-12 large-12 columns">
		            <div class="left">
		            	<h1>Prince George Tree Care</h1>
		            	<p>
		            		We are a small locally owned and operated tree care service, with a track record of rigorous work ethic and satisfied clients.
		            	</p>

		            	<p>
		            		We are fully insured, with experience in arboriculture and sustainable landscapes. Our services include fine pruning, tree removal, hedge trimming, planting, and shrub maintenance.
		            	</p>

		            	<p>
		            		We are passionate about northern BC's unique ecosystem and the important role trees and landscape play in the urban environment. Nature With Us is a <span style="color: #e0e003;">specialty tree service educated in both horticulture and arboriculture, addressing the needs of both trees, and the environment.</span>
		            	</p>

		            	<p>
		            		As a former Ontario company, we moved to BC years ago with plans to bring our eastern arboriculture knowledge, talent, and the same great service to Prince George and it's surrounding regions.
		            	</p>
		            </div>
		        </div>
		    </div>
		</section>
	</div><!-- /content wrapper -->

	<section id="eco-friendly">
	        <div class="eco-friendly-bg"></div>
	        <div class="row eco-friendly-row main-row">
	            <div class="small-12 large-7 columns left">
	                <div>
	                    <h3>Eco Friendly</h3>
	                    <p>We provide sustainable, eco-friendly methods;
						   avoiding the use of harsh chemicals, and using organic materials to maintain plant and ecosystem health. As a small company, electric tools are used where possible, mitigating our carbon footprint and noise pollution while working. We are working on a tree nursery and mulch yard in hopes of procucing local native trees for planting. Recycled materials are used to their fullest where possible for structures, propagation, etc.
						 </p>
						 <p>
						   We recommend and promote the use of native trees and plants to support local ecosystems. Plants have a deep connection to the local conditions, mother trees and soil miccorrizae. We believe a few small and seemingly effortless decisions such as diversification, preserving soil health, and changing how we work in the landscape can make lasting changes on the environment.
						 </p>
	                </div>
	            </div>
	            <div class="small-12 large-5 columns right medium-media-padding">

	                <div class="row types-count-row" data-scroll>
	                    <div class="small-12 columns">
	                    	<img src="assets/img/planting-hands.png" alt="eco-friendly">
	                    </div>
	                </div>
	            </div>
	        </div>
	</section>

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->