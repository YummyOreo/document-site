export default {
  devMode:
    window.location.href.includes("localhost") ||
    window.location.href.includes("127.0.0.1")
      ? true
      : false,
};
