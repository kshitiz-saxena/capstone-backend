function createDemoRequest({ name, email, company, message }) {
  return {
    id: Date.now().toString(36),
    name,
    email,
    company: company || 'Not provided',
    message,
    createdAt: new Date().toISOString(),
  };
}

module.exports = {
  createDemoRequest,
};
