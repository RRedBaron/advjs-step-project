const instance = axios.create({
    baseURL: "https://ajax.test-danit.com/api/v2/cards",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  instance.interceptors.request.use(
    function (config) {
      if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN)}`,
        };
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
);
  
instance('').then(res => console.log('res  =>', res)); //
//nmp install axios - import ili required


