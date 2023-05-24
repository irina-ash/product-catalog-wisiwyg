import styles from './ProductInfoEdit.module.scss';

export const wysiwygToolbar = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'textAlign',
    'fontFamily',
    'colorPicker',
    'link',
    'image',
    'remove',
    'history',
  ],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    className: styles.blockType,
    dropdownClassName: styles.blockTypeDropDown,
  },
  fontSize: {
    options: [
      8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 30, 32, 36, 48, 50, 56, 60, 72,
    ],
  },
  fontFamily: {
    options: [
      'Druk Text Cy',
      'Inter Regular',
      'Inter Medium',
      'Inter SemiBold',
      'Inter Bold',
      'Inter ExtraBold',
      'Robotron Dot Matrix',
    ],
  },
  textAlign: {
    inDropdown: false,
    options: ['left', 'center', 'right', 'justify'],
  },
  colorPicker: {
    popupClassName: styles.colorPicker,
    colors: [
      '#28282d',
      '#3a3a40',
      '#818990',
      '#b2b4b5',
      '#e0e9ec',
      '#ffffff',
      '#1fba66',
      '#56d487',
      '#49d1da',
      '#8bb1dd',
      '#3ab6ec',
      '#354c63',
      '#6c48d0',
      '#9176dc',
      '#f96261',
      '#f68400',
      '#ffa000',
    ],
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    popupClassName: styles.linkPopup,
  },
  embedded: {
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  image: {
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    previewImage: true,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: {present: false, mandatory: false},
    defaultSize: {
      height: 'auto',
      width: '500',
    },
  },
  history: {
    inDropdown: false,
    options: ['undo', 'redo'],
  },
};
