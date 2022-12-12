import Axios from "axios";
import { settings } from "../configs/settings";
import localStorageServ from "./locaStorage.service";
import {
  actRequestStarted,
  actRequestEnded,
  actResetSpinner,
} from "../components/Spinner/modules/action";
import store from "../redux/configStore";
class AxiosService {
  axios;
  axiosConfig;
  authService;
  constructor(params) {
    this.axios = Axios.create({
      baseURL: this.getBaseUrl(),
    });
    this.getAxiosConfig();
  }

  getBaseUrl() {
    return settings.domain;
  }

  getAxiosConfig = (_token) => {
    const token = _token ? _token : localStorageServ.accessToken.get();
    this.axiosConfig = {
      headers: {
        "Auth-key": `${token}`,
        "Content-Type": "application/json",
      },
    };
  };

  removeAxiosConfig = () => {
    this.axiosConfig = {
      headers: {
        "Auth-key": ``,
        "Content-Type": "application/json",
      },
    };
  };

  getMethod(uri) {
    return this.handleFlow(this.axios.get(uri, this.axiosConfig));
  }

  postMethod(uri, data) {
    return this.handleFlow(this.axios.post(uri, data, this.axiosConfig));
  }

  putMethod(uri, data) {
    return this.handleFlow(this.axios.put(uri, data, this.axiosConfig));
  }

  patchMethod(uri, data) {
    return this.handleFlow(this.axios.patch(uri, data, this.axiosConfig));
  }

  deleteMothod(uri) {
    return this.handleFlow(this.axios.delete(uri, this.axiosConfig));
  }

  handleFlow(method) {
    store.dispatch(actRequestStarted());
    return new Promise((resolve, reject) => {
      method
        .then((res) => {
          // console.log("res", res);
          store.dispatch(actRequestEnded());
          resolve({
            data: res.data.data,
            status: res.status,
            isSuccess: true,
          });
        })
        .catch((err) => {
          // loggerService.error(this.namespace, "", { ...err });
          store.dispatch(actResetSpinner());
          this.handleError(err);
          reject({
            message: err?.response.data.errorCodes,
            statusCode: err?.response.statusText,
            status: err?.response.status,
          });
        });
    });
  }

  handleError = (err) => {
    const status = err.response?.status;
    switch (status) {
      // case 400:
      case 401:
      case 403:
        window.location.assign("/login");
        break;
      default:
        break;
    }
  };

  axiosInstance = (req) => {
    this.axios(req, this.axiosConfig);
  };
}

const AxiosServ = new AxiosService();
export default AxiosServ;
