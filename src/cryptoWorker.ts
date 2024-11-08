const workerCode = `
  self.onmessage = () => {
    const uuid = self.crypto.randomUUID(); // Using randomUUID() to generate a UUID
    self.postMessage(uuid); // Send the generated UUID to the main thread
  };
`;

// Creation of Blob from workerCode
const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
// URL generation for Blob (Web Worker)
const workerURL = URL.createObjectURL(workerBlob);

export default workerURL;
