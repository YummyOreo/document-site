const defaultConfig = {
  devMode:
    window.location.href.includes("localhost") ||
    window.location.href.includes("127.0.0.1") ||
    window.location.href.includes("localho")
      ? true
      : false,
};

export { defaultConfig };
