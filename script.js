window.addEventListener("load", function() {
  console.log("Page loaded, initializing form...");
  
  const form = document.getElementById("contactForm");
  const button = document.querySelector("button");
  
  console.log("Form element:", form);
  console.log("Button element:", button);
  
  if (form) {
    form.onsubmit = function(e) {
      console.log("Form submit event triggered!");
      e.preventDefault();
      
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);
      
      if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
      }
      
      fetch("https://tonypaxy-github-io.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      })
      .then(res => res.json())
      .then(data => {
        console.log("Success:", data);
        alert(data.message);
        form.reset();
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Unable to connect to server");
      });
    };
  } else {
    console.error("Form with ID 'contactForm' not found!");
  }
});
