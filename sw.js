self.addEventListener('paymentrequest', (event) => {
  event.respondWith(new Promise((resolve, reject) => {
    // 1. Open the confirmation window
    event.openWindow('payment-app.html').then((windowClient) => {
      if (!windowClient) {
        reject('Could not open the payment confirmation window.');
      }
    }).catch((err) => reject(err));

    // 2. Listen for the message from payment-app.html
    self.addEventListener('message', (msg) => {
      if (msg.data === 'confirm-payment') {
        resolve({
          methodName: "https://hintorando.github.io/pay/",
          details: { 
            token: 'HINTORANDO-' + Math.random().toString(36).substr(2, 9),
            status: 'success'
          }
        });
      }
    });
  }));
});
