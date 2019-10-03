importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');

  var firebaseConfig = {
    apiKey: "AIzaSyDeOkim85Hk3QlfUPsVTvCb6A1JADgsRAk",
    authDomain: "api-project-913469725396.firebaseapp.com",
    databaseURL: "https://api-project-913469725396.firebaseio.com",
    projectId: "api-project-913469725396",
    storageBucket: "",
    messagingSenderId: "913469725396",
    appId: "1:913469725396:web:ba853f2e1057c3189db941",
    measurementId: "G-0223H01FCH"
  };
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Handling background message', payload);

  // Copy data object to get parameters in the click handler
  payload.data.data = JSON.parse(JSON.stringify(payload.data));

  return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function(event) {
  const target = event.notification.data.click_action || '/';
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // clientList always is empty?!
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === target && 'focus' in client) {
        return client.focus();
      }
    }

    return clients.openWindow(target);
  }));
});
