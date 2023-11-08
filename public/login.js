document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const errorMessage = document.getElementById('error-message'); // Selecciona el elemento del mensaje de error

  
    registroForm.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const nombreuser = registroForm.querySelector('input[name="nombreuser"]').value;
      const email = registroForm.querySelector('input[name="email"]').value;
      const password = registroForm.querySelector('input[name="password"]').value;
  
      if (nombreuser === '' || email === '' || password === '') {
        alert('Por favor, complete todos los campos.');
        return;
      }
  
      if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
  
      const role = registroForm.querySelector('input[name="role"]').value;
  
      const data = { nombreuser, email, password, role };
  
      const apiUrl = 'http://localhost:3000/api/registro';
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          console.log('Registro exitoso');
          registroForm.reset();
          errorMessage.textContent = ''; // Borra cualquier mensaje de error anterior
        } else {
          console.error('Error en el registro');
          // Manejar errores aquí, por ejemplo, mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error('Error en la solicitud');
        // Manejar errores de conexión o solicitud
      }
    });
  });
  
  