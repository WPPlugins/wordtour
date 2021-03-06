;if(window.jQuery) {
	(function($) {
		$.fn.gallerySlider = function(options) {
			var settings = jQuery.extend({
				overlay : ""
			}, options);
			
			var elem = $(this);
			var images = elem.find("img") ;
			if(images.length>0) {
				elem.scrollable().find("img").each(function(index) {
					$(this).parent().attr("class",index+1).attr("name","item").find("img").overlay({
						target : settings.overlay,
				 		onBeforeLoad : function(e){
							var that = this,overlay = e.currentTarget.getOverlay(),
							img = e.currentTarget.getTrigger(),imgWrap = img.parent(),
							itemIndex = parseInt(imgWrap.attr("class")),totalItems = elem.find(".items span[name=item]").length,
							src =  imgWrap.find("input[name=src]").val(),
							w = imgWrap.find("input[name=width]").val(),h = imgWrap.find("input[name=height]").val();
							overlay.find(".item-index").html(itemIndex).parent().find(".total-items").html(totalItems);
							
							$(settings.overlay).css({width:w+"px"}).find(".image").html("<img width='"+w+"' height='"+h+"' src='"+src+"'/>");
							
							(function navigation(){
								var next = overlay.find(".nextThumb").unbind("click"),
									prev = overlay.find(".prevThumb").unbind("click");
								
								if(itemIndex < totalItems) {
									next.show().click(function(){
										overlay.data("trigger",{index:itemIndex+1});
										that.close();
									});
								} else {
									next.hide();
								}
								
								if(itemIndex > 1) {
									prev.show().click(function(){
										overlay.data("trigger",{index:itemIndex-1});
										that.close();
									});
								} else {
									prev.hide();
								}
							})();
							
						},
						onClose : function(e){
							var img = e.currentTarget.getTrigger();
							var data = e.currentTarget.getOverlay().data("trigger"); 
							if(data) img.parents(".items").find("span[class="+data.index+"] img").click();
							e.currentTarget.getOverlay().data("trigger",false);
						},
						mask : {
							color:"#000000",
							onBeforeClose : function(){
								var overlay = $("#wt-gallery-overlay");
								if(overlay.data("trigger")) return false;
							}
						},
						effect : "default"
					});;
				});
			}
		};
	})(window.jQuery);
	
	
}