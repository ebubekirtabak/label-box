const { crashReporter } = require('electron');

crashReporter.start({
  productName: 'LabelBox',
  companyName: 'ebubekirtabak',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true,
});
