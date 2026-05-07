export const API = {
  login: '/api/login/',
  registro: '/api/registro/',
  user: (email) => `/api/user/${encodeURIComponent(email)}/`,
  subidaCursos: '/api/subida-cursos/',
  cursosList: '/api/subida-cursos/list/',
  cursoDetail: (id) => `/api/subida-cursos/${id}/`,
};
