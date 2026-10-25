function createDemoRequest({ name, email, company, message, requestedBy }) {
  return {
    id: Date.now().toString(36),
    name,
    email,
    company: company || 'Not provided',
    message,
    requestedBy,
    createdAt: new Date().toISOString(),
  };
}

module.exports = {
  createDemoRequest,
};
