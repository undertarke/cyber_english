import devEnv from "../environments/environment";
import stagingEnv from "../environments/environment.staging";
import prodEnv from "../environments/environment.prod";
const nodeENV = process.env.REACT_APP_STAGE;
const varEnd =prodEnv
 // nodeENV === "prod" ? prodEnv : nodeENV === "staging" ? stagingEnv : devEnv;
export const settings = {
  domain: varEnd.apiUrl,
  env: varEnd.env,
  faceBookAppId: varEnd.faceBookAppId,
  production: varEnd.production,
  enableCheat: varEnd.enableCheat,
  version: varEnd.version,
  nodeENV,
  varEnd,
};
