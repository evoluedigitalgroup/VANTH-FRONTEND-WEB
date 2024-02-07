export const openSelectClient = (state) => {
  return {
    selectClient: true,
    selectTemplate: null,
    previewContract: null,
    pdfEditor: null,
    reviewTemplateSelect: null
  };
};

export const resetModels = (state) => {
  return {
    selectClient: null,
    selectTemplate: null,
    previewContract: null,
    pdfEditor: null,
    reviewTemplateSelect: null
  };
};

export const openSelectTemplate = (state) => {
  return {
    selectClient: null,
    selectTemplate: true,
    previewContract: null,
    pdfEditor: null,
    reviewTemplateSelect: null
  };
};

export const openPreviewContract = (state) => {
  return {
    selectClient: null,
    selectTemplate: null,
    previewContract: true,
    pdfEditor: null,
    reviewTemplateSelect: null
  };
};

export const openPDFEditor = (state) => {
  return {
    selectClient: null,
    selectTemplate: null,
    previewContract: null,
    pdfEditor: true,
    reviewTemplateSelect: null
  };
};

export const openReviewTemplateSelect = (state) => {
  return {
    selectClient: null,
    selectTemplate: null,
    previewContract: null,
    pdfEditor: null,
    reviewTemplateSelect: true
  };
};
