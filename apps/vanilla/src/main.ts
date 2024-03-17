import "./style.css";

// https://developer.chrome.com/docs/devtools/memory-problems#allocation-profile

// var x = [];

// function grow() {
//   console.log("growing", x.length);
//   for (var i = 0; i < 10000; i++) {
//     const newItem = document.createElement("div");
//     newItem.textContent = "Hello World";
//     document.body.appendChild(newItem);
//   }
//   x.push(new Array(1000000).join("x"));
// }

const button = document.getElementById("create") as HTMLButtonElement;

function grow() {
  // Add 100 event listeners to the button

  for (var i = 0; i < 100; i++) {
    button.addEventListener("click", () => console.log("clicked"));
  }
}

button.addEventListener("click", grow);

// var detachedTree;

// function create() {
//   console.log("creating");

//   var ul = document.createElement("ul");
//   for (var i = 0; i < 10; i++) {
//     var li = document.createElement("li");
//     ul.appendChild(li);
//   }
//   detachedTree = ul;
// }

// document.getElementById("create")!.addEventListener("click", create);
