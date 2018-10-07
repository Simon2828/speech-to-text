// Start the stream
socket.on('startGoogleCloudStream', function(request) {
    speechToTextUtils.startRecognitionStream(socket, GCSServiceAccount, request);
});
// Receive audio data
socket.on('binaryAudioData', function(data) {
    speechToTextUtils.receiveData(data);
});

// End the audio stream
socket.on('endGoogleCloudStream', function() {
    speechToTextUtils.stopRecognitionStream();
});