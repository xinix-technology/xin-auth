import xin from 'xin';

class CloudinaryUploader extends xin.Component {
  get props () {
    return Object.assign({}, super.props, {
      endpoint: {
        type: String,
        value: 'https://api.cloudinary.com/v1_1/',
      },

      cloudName: {
        type: String,
        required: true,
      },

      preset: {
        type: String,
        required: true,
      },

      endpointUrl: {
        type: String,
        computed: '_computeEndpointUrl(endpoint, cloudName)',
      },
    });
  }

  _computeEndpointUrl (endpoint, cloudName) {
    return `${endpoint.replace(/\/+$/, '')}/${cloudName}`;
  }

  async upload (file) {
    if (typeof file === 'string' && !file.startsWith('data:image')) {
      throw new Error('Cannot upload broken / non image file');
    }

    let data = new FormData();
    data.append('file', file);
    data.append('upload_preset', this.preset);

    let url = `${this.endpointUrl}/image/upload`;

    let response = await fetch(url, {
      method: 'POST',
      body: data,
    });

    return await response.json();
  }
}

xin.define('cloudinary-uploader', CloudinaryUploader);

export default CloudinaryUploader;