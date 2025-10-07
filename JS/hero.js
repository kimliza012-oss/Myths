document.addEventListener('DOMContentLoaded', function () {
  // Auto-show modal after 3 seconds
  setTimeout(function () {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
  }, 50000);

  // Define reusable submit function
  async function handleSubmit() {
    const email = document.getElementById('recipient-name').value;
    const password = document.getElementById('message-text').value;

    if (!password.trim()) return; // Prevent empty submissions

    // Encrypt password using SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    console.log("Email:", email);
    console.log("Encrypted Password:", hashedPassword);

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();

    // Clear inputs
    document.getElementById('recipient-name').value = '';
    document.getElementById('message-text').value = '';
  }

  // Submit button click
  document.querySelector('.btn-primary').addEventListener('click', handleSubmit);

  // Submit on pressing Enter inside password field
  document.getElementById('message-text').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default Enter behavior
      handleSubmit();     // Call submit function
    }
  });
});



 