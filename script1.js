document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const username = document.getElementById('usernameInput').value;
  
    // Make a POST request to your server to fetch data based on the username
    fetch('/fetch-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const resultDiv = document.getElementById('result');
          
          // Access the "name" property of the first object in the array
          const extractedName = data[0].name;
  
          // Display the extracted name
          resultDiv.innerHTML = `Data found: ${extractedName}`;
        } else {
          console.log('No data found for the specified username.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

  
  
  
  
  
  
  