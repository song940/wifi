import { ready, addEventListener } from 'https://lsong.org/scripts/dom.js';

const escape = (v = '') => {
  const needsEscape = ['"', ';', ',', ':', '\\'];
  let escaped = '';
  for (const c of v) {
    if (needsEscape.includes(c)) {
      escaped += `\\${c}`;
    } else {
      escaped += c;
    }
  }
  return escaped;
};


ready(() => {

  const wifi = {
    encryption: 'WPA',
    hiddenSSID: false,
  };

  const commit = () => {
    const ssid = escape(wifi.ssid);
    const password = !wifi.encryption ? '' : escape(wifi.password);
    const sign = `WIFI:T:${wifi.encryption};S:${ssid};P:${password};H:${wifi.hiddenSSID};`;
    qrcode.src = 'https://api.lsong.me/qr?text=' + sign;
  };

  addEventListener('form', 'input', (e) => {
    const input = e.target;
    const { name } = input;
    switch (name) {
      case 'encryption':
        const { encryption } = input.dataset;
        wifi[name] = encryption;
        break;
      case 'hiddenSSID':
        wifi[name] = input.checked;
        break;
      default:
        wifi[name] = input.value;
        break;
    }
    commit();
  })
});
