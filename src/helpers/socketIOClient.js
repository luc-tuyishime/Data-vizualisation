import SockJS from 'sockjs-client';

const { REACT_APP_IREMBO_USSD_WEB_SOCKET } = process.env;

export const sock = new SockJS(REACT_APP_IREMBO_USSD_WEB_SOCKET);
