const moveToMap = (address: string) => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const locationQuery = encodeURIComponent(`${address}`);
  let mapUrl = `https://www.google.com/maps/search/?api=1&query=${locationQuery}`;
  if (isIOS) {
    mapUrl = `comgooglemaps://?q=${locationQuery}`;
  }
  window.location.href = mapUrl;
};

export default moveToMap;
