document.addEventListener("DOMContentLoaded", function() {

const form = document.getElementById("contactForm");

if (!form) {
  console.error("Form not found!");
  return;
}

form.addEventListener("submit", async function(event) {
  
  event.preventDefault();
  console.log("Form submitted!");
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  
  console.log("Form data:", { name, email, message });
  
  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }
  
  try {
    
    console.log("Sending request to backend...");
    
    const response = await fetch(
      "https://tonypaxy-github-io.onrender.com/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      }
    );
    
    console.log("Response status:", response.status);
    
    const data = await response.json();
    
    console.log("Response data:", data);
    
    alert(data.message);
    
    form.reset();
    
  } catch(error) {
    
    console.error("Error:", error);
    
    alert("Unable to connect to server");
    
  }
  
});

});
