const mockBridge = new (class Bridge {
  getHttpClient = jest.fn();
  getAuthenticationCredentials = jest.fn();
})();

export default mockBridge;
