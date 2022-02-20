const numBtns = document.querySelectorAll(".numBtn");
let i = 9;
numBtns.forEach((btn) => {
	const newNumBtn = document.createElement("button");
	newNumBtn.classList.add("btnStyles");
	newNumBtn.textContent = i;
	btn.appendChild(newNumBtn);
	i--;
});
