const BASE = 'http://127.0.0.1:8000';

export const API = {
  login: `${BASE}/api/login/`,
  registro: `${BASE}/api/registro/`,
  user: (email) => `${BASE}/api/user/${encodeURIComponent(email)}/`,
  subidaCursos: `${BASE}/api/subida-cursos/`,
  cursosList: `${BASE}/api/subida-cursos/list/`,
  cursoDetail: (id) => `${BASE}/api/subida-cursos/${id}/`,
  contactMessages: `${BASE}/api/contact-messages/`,
  contactMessagesList: `${BASE}/api/contact-messages/list/`,
  apuntesPdf: `${BASE}/api/apuntes-pdf/`,
  apuntesPdfList: `${BASE}/api/apuntes-pdf/list/`,
  apuntesPdfDetail: (id) => `${BASE}/api/apuntes-pdf/${id}/`,
  contactMessagesPdf: `${BASE}/api/contact-messages-pdf/`,
  contactMessagesPdfList: `${BASE}/api/contact-messages-pdf/list/`,
};
