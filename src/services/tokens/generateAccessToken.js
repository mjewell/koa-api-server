import { accessTokenBytes } from '../../config/security';
import generateRandomTokenFunction from './generateRandomTokenFunction';

export default generateRandomTokenFunction(accessTokenBytes);
