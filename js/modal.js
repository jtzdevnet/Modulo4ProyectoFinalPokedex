document.addEventListener("DOMContentLoaded", function(event) {
	var modal_trigger_buttons = document.querySelectorAll(".modal-button");
	modal_trigger_buttons.forEach((modal_trigger_button) => {
		modal_trigger_button.addEventListener("click", function(){
			var target_modal = this.getAttribute("data-bs-target");
			document.querySelector(".modal-overlay").classList.add("open");
			const event = new Event('modal_show');
			window.dispatchEvent(event);
			setTimeout(() => {
				document.querySelector(".modal-overlay").classList.add("show");
			}, "150");
			
			document.querySelector(target_modal).classList.add("open");
			setTimeout(() => {
				document.querySelector(target_modal).classList.add("show");
			}, "150");
		});
	});

	var modal_overlay = document.querySelector(".modal-overlay");
	modal_overlay.addEventListener("click", function(e){
		if (e.target.classList.contains("modal-overlay")){
			var open_modal = document.querySelector(".modal.open");
			const event = new Event('modal_hide');
			window.dispatchEvent(event);
			open_modal.classList.remove("show");
			open_modal.classList.add("closing");
			setTimeout(() => {
				open_modal.classList.remove("open");
				open_modal.classList.remove("closing");
			}, "300");
			this.classList.remove("show");
			setTimeout(() => {
				this.classList.remove("open");
			}, "300");
		}
	});

	var modal_close_buttons = document.querySelectorAll(".modal-close");
	modal_close_buttons.forEach((modal_close_button) => {
		modal_close_button.addEventListener("click", function(e){
			var open_modal = document.querySelector(".modal.open");
			const event = new Event('modal_hide');
			window.dispatchEvent(event);
			open_modal.classList.remove("show");
			open_modal.classList.add("closing");
			setTimeout(() => {
				open_modal.classList.remove("open");
				open_modal.classList.remove("closing");
			}, "300");
			document.querySelector(".modal-overlay").classList.remove("show");
			setTimeout(() => {
				document.querySelector(".modal-overlay").classList.remove("open");
			}, "300");
		});
	});
})
