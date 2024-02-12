const allStates = {
  selectClient: null,
  selectTemplate: null,
  previewContract: null,
  pdfEditor: null,
  reviewTemplateSelect: null,
  contractReview: null,
};

export const openSelectClient = () => {
  return {
    ...allStates,
    selectClient: true,
  };
};

export const resetModels = () => {
  return allStates;
};

export const openSelectTemplate = () => {
  return {
    ...allStates,
    selectTemplate: true,
  };
};

export const openPreviewContract = () => {
  return {
    ...allStates,
    previewContract: true,
  };
};

export const openPDFEditor = () => {
  return {
    ...allStates,
    pdfEditor: true,
  };
};

export const openReviewTemplateSelect = () => {
  return {
    ...allStates,
    reviewTemplateSelect: true,
  };
};

export const openContractReview = () => {
  return {
    ...allStates,
    contractReview: true,
  };
};
