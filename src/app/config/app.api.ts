export interface IApi {
    apiEndpoint: string;
    method: string;
}

// authentication apis
export let LOGGING_USER: IApi = {
    apiEndpoint: 'api/userinf',
    method: 'GET',
  };
  
  export let APP_LOGIN: IApi = {
    apiEndpoint: 'oauth/token',
    method: 'GET',
  };
  
  export let APP_LOGOUT: IApi = {
    apiEndpoint: 'oauth/logout',
    method: 'GET',
  };

//api 
export const PURCHASEORDER_GET_LIST: IApi = {
    apiEndpoint: 'api/purchaseOrders',
    method: 'POST',
};

export const PURCHASEORDER_GET_DETAIL: IApi = {
    apiEndpoint: 'api/purchaseOrder?id=',
    method: 'GET',
};

export const SHIPPINGPLAN_GET_LIST: IApi = {
  apiEndpoint: 'api/shippingPlans',
  method: 'POST',
};
export const SHIPPINGPLAN_GET_DETAIL: IApi = {
  apiEndpoint: 'api/shippingPlan?id=',
  method: 'GET',
};

export const ADDITIONALPR_GET_LIST: IApi = {
  apiEndpoint: 'api/additional/products',
  method: 'POST',
};
export const ADDITIONALPR_EDIT_OBJ: IApi = {
  apiEndpoint: 'api/additional/product',
  method: 'POST',
};

export const SHIPPINGPLANFEEDETAIL_GET_LIST: IApi = {
  apiEndpoint: 'api/shippingPlanFeeDetails',
  method: 'POST',
};
export const SHIPPINGPLANFEEDETAIL_GET_DETAIL: IApi = {
  apiEndpoint: 'api/shippingPlanFeeDetail?id=',
  method: 'GET',
};
export const SHIPPINGPLANFEEDETAIL_EDIT_OBJ: IApi = {
  apiEndpoint: 'api/shippingPlanFeeDetail',
  method: 'POST',
};

export const RECEIVEMONEY_GET_LIST: IApi = {
  apiEndpoint: 'api/receiveMoneies',
  method: 'POST',
};

export const RECEIVEMONEY_GET_DETAIL: IApi = {
  apiEndpoint: 'api/receiveMoney?id=',
  method: 'GET',
};
export const RECEIVEMONEY_DEL_OBJ: IApi = {
  apiEndpoint: 'api/receiveMoney',
  method: 'DETETE',
};
export const RECEIVEMONEY_EDIT_OBJ: IApi = {
  apiEndpoint: 'api/receiveMoney',
  method: 'POST',
};

export const PARTNERLIABILITY_GET_LIST: IApi = {
  apiEndpoint: 'api/partnerLiabilities',
  method: 'POST',
};

export const PARTNERLIABILITY_GET_DETAIL: IApi = {
  apiEndpoint: 'api/partnerLiability?lite=false&id=',
  method: 'GET',
};

export const ADDRESS_GET_LIST: IApi = {
  apiEndpoint: 'api/addresss',
  method: 'POST',
};

export const HEREMAP_GEO_GET: IApi = {
  apiEndpoint: 'https://geocoder.api.here.com/6.2/geocode.json?app_id=fRMdJ6FrcwjrHxrrQw5D&app_code=4IcF1EsdIT_xM_x90jUZSQ&searchtext=',
  method: 'POST',
};
