window.agentxLogLevel = window.agentxConfig.LOG_LEVEL;
window.AgentxLogger = function (name) {
  if (!name) {
    throw Error('Name of logger must be provided');
  }

  this.log = (...msg) => {
    if (window.agentxLogLevel > 0) {
      console.log('INFO', name, ...msg)
    }
  }

  this.debug = (...msg) => {
    if (window.agentxLogLevel > 1) {
      console.log('DEBUG', name, ...msg);
    }
  }

  this.error = (...msg) => {
    console.error(name, ...msg);
  }
}
